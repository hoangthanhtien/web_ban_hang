# Register Blueprints/Views.
from gatco.response import text, json
from application.extensions import jinja

def init_views(app):
    import application.controllers.user
    import application.controllers.hanghoa
    import application.controllers.hoadon
    import application.controllers.chitiethoadon
    import application.controllers.gianhang
    import application.controllers.loaigianhang
    
    @app.route('/')
    def index(request):
        #return text("Index")
        return jinja.render('index.html', request)
    
    