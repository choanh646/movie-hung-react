import React, { useEffect, useState } from "react";
import BackNews from "../BackNews";
import { SemipolarLoading } from "react-loadingg";
import { useDispatch, useSelector } from "react-redux";
import {
  getCinemas,
  getCumRapByCinemas,
  getShowTimesByCinemas,
} from "src/actions/cinemas";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";

export default function CumRap() {
  const dispatch = useDispatch();
  const {
    dataCinemas,
    dataCumRapByCinemas,
    dataShowTimesByCinemas,
    isLoading,
    error,
  } = useSelector((state) => state.cinema);

  const [activeTab, setActiveTab] = useState("bhd-star-cineplex");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const defaultValue = "LotteCinima";
  useEffect(() => {
    dispatch(getCinemas());
    dispatch(getCumRapByCinemas(defaultValue));
    dispatch(getShowTimesByCinemas(defaultValue));
  }, []);
//   console.log("dataCinemas ", dataCinemas);
//   console.log("dataCumRapByCinemas", dataCumRapByCinemas);
//  console.log("dataShowTimesByCinemas",dataShowTimesByCinemas)
 
  if (isLoading) {
    return (
      <div>
        <SemipolarLoading color="#6B439B" />;
      </div>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div id="cumRap" className="container">
      <Nav tabs>
        {dataCinemas.map((item, index) => (
          <NavItem key={index} className="item__rap__phim">
            <NavLink
              className={classnames({ active: activeTab === item.biDanh })}
              onClick={() => toggle(item.biDanh)}
            >
              <img width="100" height="" src={item.logo} alt="logoRap" />
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={activeTab}>
        {dataCinemas.map((item, index) => (
          <TabPane tabId={item.biDanh}>
            <p>{item.tenHeThongRap}</p>
          </TabPane>
        ))}
      </TabContent>
      <BackNews></BackNews>
    </div>
  );
}
