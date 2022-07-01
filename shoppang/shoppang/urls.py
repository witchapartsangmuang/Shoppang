"""shoppang URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from backend.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api_auth', include('rest_framework.urls')),
    # category
    path('categories/', CategoryGenericsView.as_view(), name='categories'),
    path('category/<int:pk>/', CategoryDetail.as_view(), name='category-detail'),
    # product
    path('products/', ProductGenericsView.as_view(), name='products'),
    path('product/<int:pk>/', ProductDetail.as_view(), name='product-detail'),
    # user
    path('token/', LoginView.as_view(), name='token'),
    # cart
    path('carts/', CartList.as_view(), name='carts'),
    path('cart/<int:pk>/', CartUpdate.as_view(), name='cart-update'),
    path('cart/<int:cart_id>/<int:product_id>/', CartDestroy.as_view(), name='cart-destroy')
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
