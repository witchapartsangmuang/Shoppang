from django.shortcuts import render
from backend.models import *
from backend.serializer import *
from rest_framework import permissions, generics, mixins, status
from rest_framework.response import Response

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
    # permission_classes = [permissions.IsAuthenticated]
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
    # permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['enable']

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
        
# class LoginView(TokenObtainPairView):
#     serializer_class = TokenObtainPairSerializer