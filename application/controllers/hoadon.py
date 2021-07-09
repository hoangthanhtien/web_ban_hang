from sanic.response import json
from application.extensions import apimanager
from application.models.model import User, HoaDon
from application.server import app
from application.database import db
from application.extensions import auth
from gatco.exceptions import ServerError

def auth_func(request=None, **kw):
    #uid = auth.current_user(request)
    #if uid is None:
    #    raise ServerError("abc")
    
    pass

apimanager.create_api(collection_name='hoadon', model=HoaDon,
    methods=['GET', 'POST', 'DELETE', 'PUT'],
    url_prefix='/api/v1',
    preprocess=dict(GET_SINGLE=[auth_func], GET_MANY=[auth_func], POST=[auth_func], PUT_SINGLE=[auth_func]),
    )

@app.route("/confirm_purchase_order", methods=["GET"])
async def confirm_purchase_order(request):
    if request.method == "GET":
        purchase_order_id = request.args.get("id")
        status = request.args.get("status")
        record = db.session.query(HoaDon).filter(HoaDon.id == purchase_order_id).first()
        record.trangthai = status 
        db.session.commit()
        return json({},200)

