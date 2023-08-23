import cloudinary
import cloudinary.uploader


def upload_image_to_cloudinary(image_file):
    response = cloudinary.uploader.upload(image_file)
    return response['secure_url']
