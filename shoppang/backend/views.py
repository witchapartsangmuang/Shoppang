from traceback import print_tb
from django.shortcuts import render
from backend.models import *
from backend.serializer import *

from rest_framework import permissions, generics, mixins, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

import sys
# Create your views here.
class RespondData():
    def __init__(self, user=None, *args, **kwargs):
        self.respond = {
            'msg': kwargs.get('msg', 'ดึงข้อมูลสำเร็จ'),
            'data':  kwargs.get('data', [])
        }
        
class CategoryGenericsView(generics.GenericAPIView, mixins.ListModelMixin):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filterset_fields = ['enable']

    def __init__(self, *args, **kwargs):
        self.response_format = RespondData().respond
        super(CategoryGenericsView, self).__init__(*args, **kwargs)

    def get(self, request, *args, **kwargs):
        response_data = super(CategoryGenericsView, self).list(request, *args, **kwargs)
        self.response_format['data'] = response_data.data
        self.response_format['status'] = True
        if not response_data.data:
            self.response_format['message'] = 'List Empty'
        return Response(self.response_format)
    
class CategoryDetail(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryDetailSerializer
    def get(self, request, *args, **kwargs):
        obj = self.get_object()
        data = self.get_serializer(obj)
        return Response({
            'data': data.data
        }, status=status.HTTP_200_OK)
    
class ProductGenericsView(generics.GenericAPIView, mixins.ListModelMixin):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filterset_fields = ['enable']
    
    # def get_queryset(self):
    #     queryset = Product.objects.filter(enable=True)
    #     sort_by = self.request.query_params.get('sort', 'asc')
    #     # get params
    #     category = self.request.query_params.get('category', None)
    #     search = self.request.query_params.get('search', None)
    # #     #sort
    #     if sort_by == 'desc':
    #         queryset = queryset.order_by('-price')
    #     else:
    #         queryset = queryset.order_by('price')
    #     # filter in
    #     if category:
    #         queryset = queryset.filter(category=category)

    #     if search:
    #         queryset = queryset.filter(name__contains=search)
    #     return queryset
    
    def __init__(self, *args, **kwargs):
        self.response_format = RespondData().respond
        super(ProductGenericsView, self).__init__(*args, **kwargs)

    def get(self, request, *args, **kwargs):
        response_data = super(ProductGenericsView, self).list(request, *args, **kwargs)
        self.response_format['data'] = response_data.data
        self.response_format['status'] = True
        if not response_data.data:
            self.response_format['message'] = 'List Empty'
        return Response(self.response_format)
    
class ProductDetail(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer
    filterset_fields = ['enable']

    def get(self, request, *args, **kwargs):
        obj = self.get_object()
        data = self.get_serializer(obj)
        return Response({
            'data': data.data
        }, status=status.HTTP_200_OK)
        
class LoginView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer

class CartList(generics.ListCreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serialize = CartListSerializer(queryset, many=True)
        res = RespondData().respond
        res['data'] = serialize.data
        return Response(res)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            data = serializer.data
            prod = Product.objects.get(pk=data['product'])
            user = request.user
            item = Cart.objects.filter(user=user, product=prod.id).first()
            if item:
                new_qty = item.quantity = data['quantity'] + item.quantity
                item.total = item.product.price * new_qty
                item.save()
            else:
                item = Cart(
                    user=user,
                    product=prod,
                    quantity=data['quantity'],
                    total=data['quantity'] * prod.price)
                item.save()

            data['id'] = item.id
            data['product'] = item.product.name
            data['quantity'] = item.quantity
            data['total'] = item.total
            res = Response({
                'data': data,
                'msg': "บันทึกสำเร็จ",
            }, status=status.HTTP_201_CREATED)
        else:
            res = Response({
                "code": "ADD_TO_CART_FAIL",
                'msg': "บันทึกไม่สำเร็จ",
                "error": serializer.errors
            }, status=status.HTTP_401_UNAUTHORIZED)
        return res

class CartUpdate(generics.UpdateAPIView):
    serializer_class = CartUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self, request, *args, **kwargs):
        queryset = Cart.objects.filter(id=int(kwargs['pk']), user=request.user).first()
        return queryset
    def put(self, request, *args, **kwargs):
        serialize = CartUpdateSerializer(data=request.data)
        if serialize.is_valid():
            data = serialize.data
            user = request.user.id
            item = self.get_queryset(request, *args, **kwargs)
            if item:
                new_qty = item.quantity = data['quantity']
                item.total = item.product.price * new_qty
                item.save()
                data['id'] = item.id
                data['product'] = item.product.name
                data['quantity'] = item.quantity
                data['total'] = item.total
                res = Response({
                    'msg': "บันทึกสำเร็จ",
                    'data': data
                }, status=status.HTTP_200_OK)
                if item.quantity == 0:
                    item.delete()
                    res = Response({
                        'msg': "ลบสำเร็จ",
                    }, status=status.HTTP_200_OK)
            else:
                res = Response({
                    "code": "HTTP_404_NOT_FOUND",
                    'msg': "ไม่พบข้อมูล",
                }, status=status.HTTP_404_NOT_FOUND)
        else:
            res = Response({
                "code": "ADD_TO_CART_FAIL",
                'msg': "บันทึกไม่สำเร็จ",
                "error": serialize.errors
            }, status=status.HTTP_401_UNAUTHORIZED)
        return res
    
class CartDestroy(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    def destroy(self, request, *args, **kwargs):
        user = request.user
        cart_id = int(kwargs['cart_id'])
        product = int(kwargs['product_id'])
        cart = Cart.objects.filter(id=cart_id, product=product).first()
        if not cart:
            return Response({
                'code': 'HTTP_404_NOT_FOUND',
                'msg': 'ไม่พบข้อมูล'
            }, status=status.HTTP_404_NOT_FOUND)

        if cart.user != user:
            return Response({
                'code': 'HTTP_403_FORBIDDEN',
                'msg': 'ไม่มีสิทธ์เข้าใช้งาน',
            }, status=status.HTTP_403_FORBIDDEN)
        cart.delete()
        return Response({
            'msg': 'ลบสำเร็จ'
        }, status=status.HTTP_200_OK)
        