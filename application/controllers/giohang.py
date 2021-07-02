from application.controllers.helper import to_dict
from application.extensions import apimanager
from application.models.model import User,GioHang, ChiTietGioHang
from application.extensions import auth
from gatco.exceptions import ServerError
from application.database import db
from application.server import app
import json

def auth_func(request=None, **kw):
    #uid = auth.current_user(request)
    #if uid is None:
    #    raise ServerError("abc")
    
    pass

async def format_cart_details_return(data=None):
    result = []
    if data:
        for record in data:
            sub_result = to_dict(record) 
            if record.hanghoa:
                sub_result['hanghoa'] = to_dict(record.hanghoa)
            if record.giohang:
                sub_result['giohang'] = to_dict(record.giohang)
            result.append(sub_result)
    return result

apimanager.create_api(collection_name='giohang', model=GioHang,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
    )

apimanager.create_api(collection_name='chitietgiohang', model=ChiTietGioHang,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
    )

@app.route("/get_cart_details", methods=["GET"])
async def user_logout(request):
    if request.method == "GET":
        cart_id = request.args.get("cart_id",None)
        if cart_id:
            cart_details = db.session.query(ChiTietGioHang).filter(ChiTietGioHang.giohang_id == cart_id).all()
            result = await format_cart_details_return(data=cart_details)
    return json({"objects":result},200)