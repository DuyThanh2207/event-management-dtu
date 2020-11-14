import React, { useEffect, useState } from 'react';
import Navbar from './../../../components/CenterPage/Navbar';
import Header from './../../../components/Header';
import Footer from './../../../components/Footer';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import CanvasJSReact from '../../../assets/canvasjs.react';
import MaterialTable from 'material-table';
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const axios = require('axios');
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");  
  }
function Chart() {
	const [showData, setShowData] = useState([]);
	const [data, setData] = useState([])
	const [dataEvent, setDataEvent] = useState([])
    const [income, setIncome] = useState(0);
	const [expenses, setExpenses] = useState(0);
	const [loading, setLoading] = useState(false);
	const [show, setShow] = useState(false);
	
	const options = {
		theme: "light2",
		animationEnabled: true,
		exportEnabled: true,
		title: {
			text: "Event Profit"
		},
		axisY: {
			title: "Profit ( in VNĐ )",
			includeZero: false,
		},
		data: [
			{
				type: "area",
				dataPoints: data.sort(function(a, b){return a.profit-b.profit}).map((item) => {
					return ({ label: item.event_name, y: parseInt(item.profit)})
				})
			}
		]
	}
	const [column, setColumn] = useState([
        { title: 'Event ID', field: 'event_id', hidden: true},
        { title: 'Event Name', field: 'event_name'},
	])
	const option = {
		title: {
			text: "Details"
		},
		data: [
		{
			type: "column",
			dataPoints: showData.sort(function(a, b){return a.finance_spending-b.finance_spending}).map((item) => {
				return ({ label: item.finance_spending_description, y: parseInt(item.finance_spending)})
			})
		}
		]
	}
    useEffect(() => {
        axios.post('/finance-center', {
            center_id: sessionStorage.getItem("account_id")
        }).then((res) => {
            let thu = 0;
            let chi = 0;
            if(res.data.length > 0) {
                res.data.forEach((item) => {
                    if(item.finance_spending > 0)
                        thu = thu + item.finance_spending
                    else if(item.finance_spending < 0)
                        chi = chi + item.finance_spending
                })
                setIncome(thu)
				setExpenses(chi)
			}
        })
        .catch((error) => {
            console.log(error);
        })
        axios.post('/finance-profit', {
            center_id: sessionStorage.getItem("account_id")
        }).then((res) => {
            setData(res.data)
        })
        .catch((error) => {
            console.log(error);
		})
		axios.post('/finance-chart', {
            center_id: sessionStorage.getItem("account_id")
        }).then((res) => {
			setDataEvent(res.data)
        })
        .catch((error) => {
            console.log(error);
        })
	}, [])
	const onHandledClick = (e) => {
        setShow(true)
		setLoading(true)
		console.log(e.event_name);
        setTimeout(async () =>  {
            const data = await axios.post('/chart', {
				event_id: e.event_id,
				center_id: sessionStorage.getItem("account_id")
            }).then((res) => {
                if(res.data.length > 0)
					setShowData(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
            setLoading(false)
        }, 3000);
	}
    return (
        <div className="app">
            <Navbar/>
            <main>
                <Header/>
                <div className="container mt-3 mb-5">
                    <div className="row mb-5">
						<div className="col-12">
							<div className="card" style={{width:"100%"}}>
								<div className="card-body d-flex justify-content-between">
									<div>
										<strong>Income ( VNĐ )</strong>
										<hr/>
										<h4><AttachMoneyIcon/> {numberWithCommas(income)}</h4>
									</div>
									<div>
										<strong>Expenses ( VNĐ )</strong> 
										<hr/>
										<h4><MoneyOffIcon/> {numberWithCommas(expenses)}</h4>
									</div>
									<div>
										<strong>Profit ( VNĐ )</strong>
										<hr/>
										<h4><MonetizationOnIcon/> {numberWithCommas(income+expenses)}</h4>
									</div>
								</div>
							</div>
						</div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-6">
                            <div className="card">
                                <div className="card-body">
									<CanvasJSChart options = {options} />
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
							<MaterialTable
							title="Event"
							columns={column}
							data={dataEvent}
							onRowClick={(event, rowData) => onHandledClick(rowData)}
							/>
                        </div>
                    </div>
                </div>
                <Footer/>
            </main>
			<Modal show={show} onHide={() => setShow(false)} centered size="lg">
                <Modal.Body>
                    {loading ? (<div className="d-flex justify-content-center"><Spinner animation="border" /></div>) : (
						<div>
							<CanvasJSChart options = {option} />
						</div>		
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <div className="btn btn-primary" onClick={() => setShow(false)}>
                        Close
                    </div>
                </Modal.Footer>
            </Modal>
    	</div>
    );
}

export default Chart;