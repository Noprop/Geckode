from rest_framework.serializers import ModelSerializer, SerializerMethodField, PrimaryKeyRelatedField, ValidationError
from projects.serializers import Project
from .models import Sprite, SpriteLibrary


class SpriteLibrarySerializer(ModelSerializer):
    sprites_count = SerializerMethodField()

    class Meta:
        model = SpriteLibrary
        fields = ["id", "name", "sprites_count"]

    def get_permission(self, instance):
        return instance.get_permission(self.context['request'].user)
    
    def get_sprites_count(self, instance : SpriteLibrary) -> int:
        return Sprite.objects.filter(sprite_library=instance).count()
    
    def validate(self, attrs):
        try:
            if 'view' in self.context and hasattr(self.context['view'], 'kwargs'):
                if 'request' in self.context:
                    user = self.context['request'].user
                    sprite_lib = SpriteLibrary.objects.get(id=self.context['view'].kwargs.get('pk'))

                    if (sprite_lib.project == None):
                        raise ValidationError({'permission': 'Cannot modify public libraries'})


                    if not sprite_lib.has_permission(user):
                        raise ValidationError({'permission': 'You  do not have permission to perform this action'})
        except SpriteLibrary.DoesNotExist:
            pass

        return attrs



class SpriteSerializer(ModelSerializer):

    class Meta:
        model = Sprite
        fields = ["id", "name", "texture"]

    

