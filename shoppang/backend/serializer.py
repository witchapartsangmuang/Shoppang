from rest_framework import serializers
from django.contrib.auth.models import User, Group
from backend.models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']
class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
class ProductDetailSerializer(serializers.ModelSerializer):
    # imgs_product = ProductImgs(many=True)
    class Meta:
        model = Product
        fields = '__all__'  
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
class CategoryDetailSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)
    class Meta:
        model = Category
        fields = ['id', 'img', 'name', 'enable', 'detail', 'products']
class ImgsProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImgsProduct
        fields = '__all__'
class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'
class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = '__all__'
class InvoiceItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvoiceItem
        fields = '__all__'
        
# class TokenObtainPairSerializer(TokenObtainPairSerializer):
#     def validate(self, attrs):
#         # print('attrs  ==>> ', attrs)
#         try:
#             data = super().validate(attrs)
#             token = self.get_token(self.user)

#             # data['access_token'] = str(token.access_token)
#             data['token_type'] = str(token.access_token.token_type)
#             data['expire_in'] = get_current_date(
#                 token.access_token.lifetime.total_seconds())
#             # data['refresh_token'] = str(token)
#             # print('token ==>>>', data)
#             return data
#         except:
#             raise ParseError(
#                 {'msg': 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', 'code': 'LOGIN_FAIL'})