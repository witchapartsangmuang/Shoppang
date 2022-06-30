import "./../components.css"
import "./ListCart.css"

function ListCart() {

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
					<div className="title_action">แอคชั่น</div>
				</div>
				<div className="orderitem">
					<div className="body_image">
						<img src="image/basket.png" />
					</div>
					<div className="body_productname">
						ชื่อสินค้า
					</div>
					<div className="body_productprice">$55</div>
					<div className="body_numberorder">
						<div className="operatornumberorder">-</div>
						<div className="displaynumberorder">1</div>
						<div className="operatornumberorder">+</div>
					</div>
					<div className="body_action">
						<div className="deleteactionbutton">ลบ</div>
					</div>
				</div>
			</div>
			<div className="divlistcartfooter">
				<div className="divsummaryprice">
					<div className="summaryprice"><p>รวม (1 สินค้า) $55 &nbsp;&nbsp;</p></div>
				</div>
				<div className="divpaybutton">
					<div className="paybutton"><p>สั่งซื้อสินค้า</p></div>
				</div>
			</div>
		</>
	)
}
export default ListCart
