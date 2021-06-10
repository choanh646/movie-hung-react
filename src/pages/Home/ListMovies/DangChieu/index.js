import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SemipolarLoading } from "react-loadingg";
import { getMovie } from "src/actions/movie";

import MovieCardList from "../movieCardList";

export default function DangChieu() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.movie);
  const dataDangChieu = data.slice(0, 12);
  useEffect(() => {
    dispatch(getMovie());
  }, []);
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
    <div className="container">
      <div className="row">
        {dataDangChieu.map((item) => (
          <MovieCardList data={item}/>
        ))}
      </div>
    </div>
  );
}