""" Module represents a User. """

from sqlalchemy import (
    Column, String, Integer,
    DateTime, Date, Boolean,
    ForeignKey
)

from sqlalchemy import (
    Column, String, Integer, DateTime, Date, Boolean, DECIMAL, ForeignKey, Text
)
from sqlalchemy.dialects.postgresql import UUID

from sqlalchemy.orm import relationship, backref

from application.database import db
from application.database.model import CommonModel, default_uuid


roles_users = db.Table('roles_users',
                       db.Column('user_id', Integer, db.ForeignKey('users.id', ondelete='cascade'), primary_key=True),
                       db.Column('role_id', Integer, db.ForeignKey('role.id', onupdate='cascade'), primary_key=True))


class Role(CommonModel):
    """Vai trò của người dùng 

    Attributes:
        role_name: Tên của vai trò, không dấu (vd: admin, saler, cashier)
        display_name: Tên hiển thị trên giao diện (vd: Quản trị viên, Nhân viên bán hàng, Thu ngân)
        description: ghi chú cho vai trò
    """
    __tablename__ = 'role'
    id = db.Column(Integer, autoincrement=True, primary_key=True)
    role_name = db.Column(String(100), index=True, nullable=False, unique=True)
    display_name = db.Column(String(255), nullable=False)
    description = db.Column(String(255))

class User(CommonModel):
    """ Người dùng

    Attributes:
        user_name: Tên người dùng (example: Tien) 
        full_name: Tên đầy đủ (example: Hoàng Thành Tiến)
        password: Mật khẩu
        salt: Mã salt tự gen để mã hóa khẩu
        phone: Số điện thoại
        is_active: Trạng thái hoạt động của user

    """
    __tablename__ = 'users'

    id = db.Column(Integer, autoincrement=True, primary_key=True)

    # Authentication Attributes.
    phone = db.Column(String(11), index=True, unique=True)
    user_name = db.Column(String(255), nullable=False, index=True)
    full_name = db.Column(String(255), nullable=True)
    email = db.Column(String(255), nullable=False, index=True)
    password = db.Column(String(255), nullable=False)
    salt = db.Column(String(255), nullable=False)

    # Permission Based Attributes.
    is_active = db.Column(Boolean, default=True)

    # Methods
    def __repr__(self):
        """ Show user object info. """
        return '<User: {}>'.format(self.id)

# class QuocGia(CommonModel):
#     __tablename__ = 'quocgia'
#     id = db.Column(Integer, primary_key=True)
#     ma = db.Column(String(255), unique=True)
#     ten = db.Column(String(255), nullable=False)
#     mota = db.Column(String(255), nullable=True)
#     tinhthanh = db.relationship("TinhThanh", order_by="TinhThanh.id", cascade="all, delete-orphan")
    
# class TinhThanh(CommonModel):
#     __tablename__ = 'tinhthanh'
#     id = db.Column(Integer, primary_key=True)
#     ma = db.Column(String(255), unique=True)
#     ten = db.Column(String(255), nullable=False)
#     quocgia_id = db.Column(Integer, ForeignKey('quocgia.id'), nullable=False)
#     quocgia = db.relationship('QuocGia')

# class KhachHang(CommonModel):
#     __tablename__ = 'khachhang'
#     id = db.Column(Integer, primary_key=True)
#     ma = db.Column(String(255), unique=True)
#     ten = db.Column(String(255), nullable=False)
#     quocgia_id = db.Column(Integer, ForeignKey('quocgia.id'), nullable=False)
#     quocgia = db.relationship('QuocGia')
#     sodienthoai = db.Column(String(255))
#     email = db.Column(String(255))
#     diachi = db.Column(String(255))

class LoaiGianHang(CommonModel):
    """Loại gian hàng

    Attributes:
        ten_loaigianhang: Tên loại gian hàng (Gian hàng "Công nghệ", "Thực phẩm")
    """
    __tablename__ = 'loaigianhang'
    id = db.Column(Integer, primary_key=True)
    ten_loaigianhang = db.Column(String(255))

class GianHang(CommonModel):
    """Gian hàng

    Attributes:
        ma_gian_hang: Mã gian hàng 
        ten_gian_hang: Tên gian hàng
        loai_gian_hang_id: Khóa ngoại tới loại gian hàng
        chu_gian_hang_id: Khóa ngoại tới chủ gian hàng

    """
    __tablename__ = 'gianhang'
    id = db.Column(Integer, primary_key=True)
    ma_gian_hang = db.Column(String(255), unique=True)
    ten_gian_hang = db.Column(String(255), nullable=False)
    loai_gian_hang_id = db.Column(Integer, ForeignKey('loaigianhang.id'), nullable=True)
    loai_gian_hang = db.relationship("LoaiGianHang", foreign_keys=[loai_gian_hang_id])
    chu_gian_hang_id = db.Column(Integer, ForeignKey('users.id'), nullable=False)
    chu_gian_hang = db.relationship("User", foreign_keys=[chu_gian_hang_id])

class HangHoa(CommonModel):
    """Hàng hóa

    Attributes:
        ma : Mã hàng hóa 
        ten: Tên hàng hóa
        gia: Giá hàng hóa
        ghichu: Ghi chú cho hàng hóa
        gianhang_uid: Khóa ngoại tới gian hàng (Chỉ ra sản phẩm này thuộc gian hàng nào)
        trang_thai: 0-deactive, 1-active
        vat: Thuế giá trị gia tăng, default = 10, nếu = 10 thì tức là vat = 10 %
        image_url: link ảnh sản phẩm
    """
    __tablename__ = 'hanghoa'
    id = db.Column(Integer, primary_key=True)
    ma = db.Column(String(255), unique=True)
    ten = db.Column(String(255), nullable=False)
    gia = db.Column(Integer)
    vat = db.Column(Integer, default=10)
    ghichu = db.Column(String(255))
    gianhang_uid = db.Column(Integer, ForeignKey('gianhang.id'),nullable=False)
    gianhang = db.relationship("GianHang")
    trang_thai = db.Column(Integer,default=1)
    image_url = db.Column(String(255))

class HoaDon(CommonModel):
    """Hóa đơn

    Attributes:
        ma : Mã đơn hàng
        ghichu: Ghi chú với đơn hàng
        khachhang_id: Khóa ngoại liên kết tới người mua (Đang để liên kết tới bảng users, không phải bảng khach_hang) 
        ngaymua: Ngày mua
        thanhtien: Thành tiền, sau khi đã tính thuế, hoặc chiết khấu (nếu có)
        tongtien: Tổng tiền trong hóa đơn chưa trừ thuế
        chitiethoadon: relationship đến các mặt hàng trong hóa đơn
    """
    __tablename__ = 'hoadon'
    id = db.Column(Integer, primary_key=True)
    ma = db.Column(String(255), unique=True)
    ghichu = db.Column(String(255))
    khachhang_id = db.Column(Integer, ForeignKey('users.id'), nullable=False)
    # tenkhachhang = db.Column(String(255))
    khach_hang = db.relationship("User")
    ngaymua = db.Column(DateTime)

    thanhtien = db.Column(DECIMAL)
    tongtien = db.Column(DECIMAL)

    chitiethoadon = db.relationship("ChiTietHoaDon", order_by="ChiTietHoaDon.id", cascade="all, delete-orphan", lazy='dynamic')

class ChiTietHoaDon(CommonModel):
    """

    Attributes:
        hoadon_id: Khóa ngoại liên kết tới hóa đơn (quan hệ 1 hóa đơn - n chi tiết hóa đơn)
        hanghoa_id: Khóa ngoại tới mặt hàng
        soluong: Số lượng hàng hóa
        dongia: Đơn giá/1 hàng hóa, mỗi lần tạo đơn thì lưu thông tin giá hàng hóa tại thời điêm đó vào đây
        thanhtien: Tổng tiền của hàng hóa = đơn giá * số lượng 
    """
    __tablename__ = 'chitiethoadon'
    id = db.Column(Integer, primary_key=True)
    hoadon_id = db.Column(Integer, ForeignKey('hoadon.id'), nullable=False)

    hanghoa_id = db.Column(Integer, ForeignKey('hanghoa.id'), nullable=False)
    hanghoa = db.relationship("HangHoa")
    soluong = db.Column(DECIMAL(), nullable=False)
    dongia = db.Column(Integer)
    thanhtien = db.Column(Integer)
    
class GioHang(CommonModel):
    __table_name__ = 'giohang'
    id = db.Column(Integer, primary_key=True)
    khach_hang_id = db.Column(Integer, ForeignKey("users.id"), nullable=False)
    khach_hang = db.relationship("User")
    tongtien = db.Column(Integer)
    chitietgiohang = db.relationship("ChiTietGioHang")

class ChiTietGioHang(CommonModel):
    __table_name__ = "chitietgiohang"
    hanghoa_id = db.Column(Integer, ForeignKey('hanghoa.id'), nullable=False)
    hanghoa = db.relationship("HangHoa")
    soluong = db.Column(DECIMAL(), nullable=False)
    dongia = db.Column(Integer)
    thanhtien = db.Column(Integer)
    giohang_id = db.Column(Integer, ForeignKey('giohang.id'), nullable=False)
    giohang = db.relationship("GioHang")