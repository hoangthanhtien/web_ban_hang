from application.extensions import apimanager
from application.models.model import ChiTietHoaDon, GianHang, GioHang, HoaDon, User, HangHoa
from application.server import app
from gatco.exceptions import ServerError
from sanic.response import json
from application.database import db
from sqlalchemy import func
from .helper import to_dict

def auth_func(request=None, **kw):
    #uid = auth.current_user(request)
    #if uid is None:
    #    raise ServerError("abc")
    
    pass

apimanager.create_api(collection_name='hanghoa', model=HangHoa,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
    )

async def reformat_buy_data(data=None):
    result = [] 
    for item in data:
        sub_array = []
        item_record = db.session.query(HangHoa).filter(HangHoa.id == item[0]).first()
        item_name = to_dict(item_record).get("ten")
        sub_array.append(item_name)
        sub_array.append(item[0])
        result.append(sub_array)
    return result
        

@app.route("/general_report", methods=["GET"])
async def get_general_report(request):
    if request.method == "GET":
        user_id = request.args.get("user_id",None) 
        user_record = db.session.query(User).filter(User.id == user_id).first()
        if user_id is None or user_record is None:
            return json({"Error":"Unauthorize"},401)
        else:
            user_owned_store = db.session.query(GianHang.id).filter(GianHang.chu_gian_hang_id == user_id).all()
            buy_report_records = db.session.query(ChiTietHoaDon.hanghoa_id,func.sum(ChiTietHoaDon.soluong))\
                .filter(ChiTietHoaDon.hoadon.has(HoaDon.khachhang_id == user_id))\
                    .filter(ChiTietHoaDon.hoadon.has(HoaDon.trangthai == "Thành công")).group_by(ChiTietHoaDon.hanghoa_id).all()
            sale_report_records = db.session.query(ChiTietHoaDon.hanghoa_id, func.sum(ChiTietHoaDon.soluong))\
                .filter(ChiTietHoaDon.hanghoa.has(HangHoa.gianhang_uid.in_(user_owned_store))).group_by(ChiTietHoaDon.hanghoa_id).all()
            sale_result = await reformat_buy_data(data=sale_report_records)
            result = await reformat_buy_data(data=buy_report_records)
            return json({"buy_data":result, "sale_data":sale_result})

# @app.route("/revenue_report", methods=["GET"])
# async def get_revenue_report(request):
#     if request.method == "GET":
#         gian_hang_id = request.args.get("gian_hang_id")
#         report = db.sesison.query() 
