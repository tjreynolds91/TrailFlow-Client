import React, { useEffect, useState } from "react";
import CreateListModal from "./CreateListModal";
import DisplayListModal from "./DisplayListModal";
import APIURL from "../../helpers/environment";

const ListModals = (props) => {
  const [lists, setLists] = useState([]);
  const [err, setErr] = useState("");
  const [deleteResponse, setDeleteResponse] = useState("");
  const [updateListRes, setUpdateListRes] = useState("");
  const [listResponse, setListResponse] = useState("");

  useEffect(() => {
    fetch(`${APIURL}/list/allLists`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: props.token,
      },
    })
      .then((res) => res.json())
      .then((listData) => {
        setLists(listData);
      })
      .catch((err) => {
        setErr(err);
      });
    setUpdateListRes("");
    setDeleteResponse("");
    setListResponse("");
  }, [deleteResponse, updateListRes, listResponse]);

  return (
    <div className="sidebar">
      <div className="sidebar-list-styling">
        <CreateListModal
          token={props.token}
          setListResponse={setListResponse}
        />
        <h4 style={{ color: "black", marginTop: "10px" }}>My TrailLists</h4>
        <hr />
        {lists.length > 0 ? (
          lists.map((list, index) => {
            return (
              <div key={index}>
                <DisplayListModal
                  list={list}
                  token={props.token}
                  setDeleteResponse={setDeleteResponse}
                  deleteResponse={deleteResponse}
                  setUpdateListRes={setUpdateListRes}
                  updateListRes={updateListRes}
                />
              </div>
            );
          })
        ) : err ? (
          <p>{err}</p>
        ) : (
          <p>Create some trail lists!</p>
        )}
      </div>
    </div>
  );
};

export default ListModals;
