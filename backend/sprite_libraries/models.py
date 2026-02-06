from __future__ import annotations
from django.db.models import Model, ImageField,  ForeignKey, PROTECT, CASCADE,  CharField, UUIDField
from projects.models import Project
from accounts.models import User
import string, random
import uuid

def sprite_thumbnail_path(_instance, filename : str):
    characters = string.ascii_letters + string.digits
    random_string = ''.join(random.choices(characters, k=20))
    file_ext = filename.split('.')[-1]
    return f"sprites/{random_string}.{file_ext}"

class SpriteLibrary(Model):
    name = CharField(max_length=200)
    project = ForeignKey(Project, on_delete=CASCADE, related_name="sprite_libraries", null=True)

    def has_permission(self, user: User) -> bool:
        # always allow access if it's a global library
        if (self.project == None):
            return True
        
        # otherwise, anyone who is a member has access to this library
        return self.project.has_permission(user, "view")

    def add_sprite(self, id, name:str, texture) -> None:
        Sprite.objects.create(
            id=id,
            sprite_library=self,
            name=name,
            texture=texture
        )
    
    def delete_sprite(self, id):
        Sprite.objects.filter(id=id).delete()


class Sprite(Model):
    sprite_library = ForeignKey(SpriteLibrary, related_name="sprites", on_delete=CASCADE, null=False)
    name = CharField(max_length=200, blank=False)
    texture = ImageField(upload_to=sprite_thumbnail_path, blank=False, null=False)

    def has_permission(self, user: User):
        return self.sprite_library.has_permission(user)