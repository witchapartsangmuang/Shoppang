import "./../components.css"
import "./ListCart.css"
import Axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

function ListCart() {

	const dispatch = useDispatch()
	const LoginUser = useSelector((state) => state.auth?.LoginUser)
	const UserCart = useSelector((state) => state.cart?.UserCart)

	const [numbereachitem, setnumbereachitem] = useState()

	const get_listcart = () => {
		dispatch.cart.fetchGetUserCart({
			useraccess: LoginUser.access
		})
	}
	const updateitem = (event) => {
		updatecount(parseInt(event.target.id), parseInt(event.target.value))
	}
	const updatecount = (id, value) => {
		setnumbereachitem(
			numbereachitem.map((data) => {
				if (data.id == id) {
					upcountcart(data.id, value)
					return { 'id': id, 'count': value }
				} else {
					return data
				}
			})
		)
	}
	const upcountcart = async (id, value) => {
		// await dispatch.cart.fetchPutUserCart({
		// 	id: id,
		// 	value: value,
		// 	useraccess: LoginUser.access
		// })
		// await dispatch.cart.fetchGetUserCart({
		// 	useraccess: LoginUser.access
		// })
		
		Axios.put(`http://127.0.0.1:8000/cart/${id}/`,
			{ 'quantity': value },
			{
				headers: {
					Authorization: `Bearer ${LoginUser.access}`
				}
			}
		).then((response) => {
			console.log(response.data)
			get_listcart()
		}).catch((response) => {
			console.log(response.response);
		})
	}
	const removeitem = (cart_id, prod_id) => {
		Axios.delete(`http://127.0.0.1:8000/cart/${cart_id}/${prod_id}/`,
			{
				headers: {
					Authorization: `Bearer ${LoginUser.access}`
				}
			}
		).then((res) => {
			get_listcart()
		}).catch((err) => {
			alert(err.response.data.msg)
		})
	}

	useEffect(() => {
		get_listcart()
	}, [])
	
	useEffect(() => {
		setnumbereachitem(UserCart.map(val => ({ 'id': val.id, 'count': val.quantity })))
	}, [UserCart])

	return (
		<>
			<div className="component_title">
				<span className="title_name">ListCart</span>
			</div>
			<div className="divlistcart">
				<div className="ordertitle">
					<div className="title_image">รูปภาพ</div>
					<div className="title_productname">ชื่อสินค้า</div>
					<div className="title_productprice">ราคาต่อชิ้น</div>
					<div className="title_numberorder">จำนวน</div>
					<div className="title_total">ราคารวม</div>
					<div className="title_action">แอคชั่น</div>
				</div>
				{UserCart.map((val, index) => {
					const backendpath = "http://127.0.0.1:8000"
					const imgpath = `${backendpath}${val.product.img}`
					return (
						<div className="orderitem" key={index}>
							<div className="body_image">
								<img src={imgpath} />
							</div>
							<div className="body_productname">
								{val.product.name}
							</div>
							<div className="body_productprice">
								${val.product.price}
							</div>
							<div className="body_numberorder">
								<div className="displaynumberorder">
									<input type="number" defaultValue={val.quantity} id={val.id} min="1" onChange={updateitem} /></div>
							</div>
							<div className="body_total">
								${val.total}
							</div>
							<div className="body_action">
								<div className="deleteactionbutton" onClick={() => removeitem(val.id, val.product.id)}>ลบ</div>
							</div>
						</div>
					)
				})}
			</div>
			<div className="divlistcartfooter">
				<div className="divsummaryprice">
					<div className="summaryprice"><p>รวม ( {UserCart.length} รายการ ) ${UserCart.map(d => d.product.enable && d.total).reduce((partialSum, a) => partialSum + a, 0)} &nbsp;&nbsp;</p></div>
				</div>
				<div className="divpaybutton">
					<div className="paybutton"><p>สั่งซื้อสินค้า</p></div>
				</div>
			</div>
		</>
	)
}
export default ListCart
