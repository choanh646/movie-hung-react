import { datVe, datGhe, getChiTietPhongVe } from "src/redux/actions/booking";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { SemipolarLoading } from "react-loadingg";
import AllActionDatVe from "./AllActionDatVe";
import ComponentChonGhe from "./ComponentChonGhe";

export default function Checkout() {
  const [isDone, setIsDone] = useState(false);
  const toggleDone = () => setIsDone(!isDone);

  const dispatch = useDispatch();
  const { maLichChieu } = useParams();
  const { dataChiTietPhongVe, listGheDangChon, isLoading, error } = useSelector(
    (state) => state.booking
  );
  const { userInfo } = useSelector((state) => state.auth);

  const gheVip = dataChiTietPhongVe?.danhSachGhe?.filter(
    (item) => item.loaiGhe == "Vip"
  );
  const gheThuong = dataChiTietPhongVe?.danhSachGhe?.filter(
    (item) => item.loaiGhe == "Thuong"
  );

  const handleDatGhe = (valueGhe) => {
    dispatch(datGhe(valueGhe));
  };

  const handlePay = (maLichChieu, danhSachVe, taiKhoanNguoiDung) => {
    dispatch(datVe(maLichChieu, danhSachVe, taiKhoanNguoiDung));
    toggleDone();
  };

  useEffect(() => {
    dispatch(getChiTietPhongVe(maLichChieu));
  }, [isDone]);

  const userCheck = localStorage.getItem("userInfo");

  if (userCheck == null) {
    return <Redirect to="/login" />;
  }
  if (isLoading) {
    return (
      <div>
        <SemipolarLoading color="#6B439B" />
      </div>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div id="checkout">
      <div className="checkout__title">
        <h1>Booking Online</h1>
      </div>
      <div className="checkout__content row">
        <div className="checkout__content__left col-7">
          <div className="img__manHinh">
            <img src="/img/bg-screen.png" alt="manHinh" />
          </div>
          <ComponentChonGhe
            data={gheThuong}
            listGheDangChon={listGheDangChon}
            handleDatGhe={handleDatGhe}
            styleButton={"styleButtonGheThuong"}
          />
          {/* ??? ????y 2 c??ch x??t cho styleButton ?????u ???????c */}
          <ComponentChonGhe
            data={gheVip}
            listGheDangChon={listGheDangChon}
            handleDatGhe={handleDatGhe}
            styleButton="styleButtonGheVip"
          />
          <div className="row checkout__comment">
            <div className="col-6 d-flex">
              <button
                disabled
                className="btn styleButtonDangChon"
                style={{ backgroundColor: "rgb(213, 3, 3)" }}
              >
                STT
              </button>
              <p>??ang Ch???n</p>
            </div>
            <div className="col-6 d-flex">
              <button disabled className="btn styleButtonDaDat">
                X
              </button>
              <p>???? ?????t</p>
            </div>

            <div className="col-6 d-flex">
              <button disabled className="btn styleButtonGheVip">
                STT
              </button>
              <p>Gh??? VIP</p>
            </div>

            <div className="col-6 d-flex">
              <button disabled className="btn styleButtonGheThuong">
                STT
              </button>
              <p>Gh??? Th?????ng</p>
            </div>
          </div>
        </div>
        <div className="col-5 checkout__content__right">
          <h3>
            <i>Th??ng Tin Phim</i>
          </h3>
          <div className="banner__infoMovie">
            <div
              className="top__design"
              style={{
                position: "absolute",
                top: "0",
                left: "24px",
                width: "93%",
                background: `url("/img/bg-top-seatmap.png") repeat-x transparent`,
                height: "8px",
                overflow: "hidden",
              }}
            ></div>

            <div className="row">
              <div className="col-4 banner__infoMovie__img">
                <img
                  src={dataChiTietPhongVe?.thongTinPhim?.hinhAnh}
                  alt="hinhAnh"
                />
              </div>
              <div className="col-8 banner__infoMovie__detail">
                <p>
                  <b>T??n Phim : </b>
                  {dataChiTietPhongVe?.thongTinPhim?.tenPhim}
                </p>
                <p>
                  <b>Th???i Gian Chi???u : </b>
                  {dataChiTietPhongVe?.thongTinPhim?.gioChieu} -
                  {dataChiTietPhongVe?.thongTinPhim?.ngayChieu}
                </p>
                <p>
                  <b>?????a Ch??? : </b>
                  {dataChiTietPhongVe?.thongTinPhim?.diaChi}
                </p>
                <p>
                  <b>T??n R???p : </b>
                  {dataChiTietPhongVe?.thongTinPhim?.tenRap} ,
                  {dataChiTietPhongVe?.thongTinPhim?.tenCumRap}
                </p>
              </div>
            </div>

            <div
              className="bottom__design"
              style={{
                position: "absolute",
                bottom: "-3px",
                left: "24px",
                width: "93%",
                background: `url("/img/bg-bottom-seatmap.png") repeat-x transparent`,
                height: "8px",
                overflow: "hidden",
              }}
            ></div>
          </div>
          <AllActionDatVe
            listGheDangChon={listGheDangChon}
            handleDatGhe={handleDatGhe}
            handlePay={handlePay}
            maLichChieu={maLichChieu}
            userInfo={userInfo}
          />
        </div>
      </div>
    </div>
  );
}
