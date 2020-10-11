import React from 'react';
const EventAll = () => {
    return (
        <>
            <div className="container mt-5">
                <div className="row d-flex">
                    <div className="col-3 d-flex">
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search" />
                        <i className="fa fa-search fa-lg" style={{marginLeft: '-20px', marginTop: '8px'}} />
                    </div>
                    <div className="col-2">
                        <select id="inputState" className="form-control">
                            <option selected>Last modified</option>
                            <option>Date of Event</option>
                            <option>Date created</option>
                        </select>
                    </div>
                    <div className="col-2">
                        <select id="inputState" className="form-control">
                            <option selected>Descending</option>
                            <option>Ascending</option>
                        </select>
                    </div>
                </div>
                <div className="row ml-5">
                    <div className="col-12 mt-5" style={{marginLeft: '-50px'}}>
                        <div className="card" style={{width: '100%'}}>
                            <div className="container mt-3 mb-3 col-11">
                                <div className="mb-3">
                                    <h2 style={{color: '#00839d'}}>Tên sự kiện</h2>
                                </div>
                                <div className="mb-3">
                                    Trường Đại học Duy Tân
                                </div>
                                <div className="mb-2">
                                    Ngày 02/09/2020
                                </div>
                                <hr />
                                <span>Khoa ĐTQT</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-5" style={{marginLeft: '-50px'}}>
                        <div className="card" style={{width: '100%'}}>
                            <div className="container mt-3 mb-3 col-11">
                                <div className="mb-3">
                                    <h2 style={{color: '#00839d'}}>Tên sự kiện</h2>
                                </div>
                                <div className="mb-3">
                                    Trường Đại học Duy Tân
                                </div>
                                <div className="mb-2">
                                    Ngày 02/09/2020
                                </div>
                                <hr />
                                <span>Khoa ĐTQT</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>           
    );
}

export default EventAll;