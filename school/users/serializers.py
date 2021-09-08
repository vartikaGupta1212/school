from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate
# User Serializer
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'username', 'email','is_student','is_teacher')

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
 

  class Meta:
    model = User
    fields = ('id', 'username', 'email', 'password','is_student','is_teacher')
    extra_kwargs = {'password': {'write_only': True}}

  def create(self, validated_data):
    user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'],is_student=validated_data['is_student'],is_teacher=validated_data['is_teacher'])

    return user

# Login Serializer
class LoginSerializer(serializers.Serializer):
  username = serializers.CharField()
  password = serializers.CharField()

  def validate(self, data):
    user = authenticate(**data)
    if user and user.is_active:
      return user
    raise serializers.ValidationError("Incorrect Credentials")
