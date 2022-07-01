from rest_framework import serializers
from django.contrib.auth.models import User, Group
from backend.models import *

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import ParseError, ValidationError

# from versatileimagefield.serializers import VersatileImageFieldSerializer

from datetime import datetime

def get_current_date(sec):
    return datetime.fromtimestamp(datetime.timestamp(datetime.now())+int(sec)).strftime("%d/%m/%Y, %H:%M:%S")
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
        
        
        
class TokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        try:
            data = super().validate(attrs)
            token = self.get_token(self.user)
            data['user'] = attrs['username']
            data['token_type'] = str(token.access_token.token_type)
            data['expire_in'] = get_current_date(
                token.access_token.lifetime.total_seconds())
            return data
        except:
            raise ParseError(
                {'msg': 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', 'code': 'LOGIN_FAIL'})
   
   
   
   
            
class CartSerializer(serializers.ModelSerializer):
    product = serializers.IntegerField(error_messages={
        "blank": 'ระบุรหัสสินค้า', 'write_only': True
    })
    quantity = serializers.IntegerField(error_messages={
        "blank": "ระบุจำนวนสินค้า", 'write_only': True
    })
    def validate_quantity(self, quantity):
        if quantity <= 0:
            raise ValidationError('จำนวนสินค้าต้องมากกว่า 0 ชิ้น')
        return quantity
    def validate_product(self, product):
        try:
            prod = Product.objects.get(pk=product)
        except:
            raise ValidationError('ไม่พบสินค้านี้')
        if not prod.enable:
            raise ValidationError('สินค้าถูกปิดใช้งาน')
        return product
    class Meta:
        model = Cart
        fields = ['product',  'quantity']
class CartListSerializer(serializers.ModelSerializer):
    product = ProductDetailSerializer()
    class Meta:
        model = Cart
        fields = ['id', 'product',  'quantity',  'total']
        
class CartUpdateSerializer(serializers.ModelSerializer):
    quantity = serializers.IntegerField(error_messages={
        "blank": "ระบุจำนวนสินค้า", 'write_only': True
        })
    def validate_quantity(self, quantity):
        if quantity < 0:
            return 0
        return quantity
    class Meta:
        model = Cart
        fields = ['quantity']