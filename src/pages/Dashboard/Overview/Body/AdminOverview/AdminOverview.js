import { useState } from "react";
import ManageSingleProduct from "../../../../../components/ManageSingleProduct/ManageSingleProduct";
import SingleOrder from "../../../../../components/ShowOrders/SingleOrder";
import useGlobalContext from "../../../../../hooks/useGlobalContext";
import {
  useGetAllOrdersQuery,
  useGetLastestThreeOrdersQuery,
} from "../../../../../redux/features/orders/ordersApi";
import {
  useDeleteSingleProductMutation,
  useGetLatestProductsQuery,
} from "../../../../../redux/features/products/productsApi";
import { useGetSingleUserQuery } from "../../../../../redux/features/user/userApi";
import "./AdminOverview.css";
import { toast } from "sonner";
import ManageModal from "../../../ManageProduct/ManageModal";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { processOrdersData } from "../../../../../utils/processOrdersData";

const AdminOverview = () => {
  const { setEditItem } = useGlobalContext();
  const [showModal, setShowModal] = useState(false);
  const { firebase } = useGlobalContext();
  const { user } = firebase;

  const { data: userData } = useGetSingleUserQuery(user?.email);
  const { data: allOrdersData } = useGetAllOrdersQuery(undefined);
  const { data: ordersData, refetch } = useGetLastestThreeOrdersQuery("all");
  const { data: productsData } = useGetLatestProductsQuery(undefined);
  const [deleteSingleProduct] = useDeleteSingleProductMutation();

  const handleEdit = (item) => {
    setShowModal(true);
    setEditItem(item);
  };

  const handleDelete = async (deleteId) => {
    if (!window.confirm("Are you sure you want to delete?")) {
      return;
    }
    const toastId = toast.loading("Deleting product");
    const result = await deleteSingleProduct(deleteId);

    if (result.data.success) {
      toast.success(result.data.message, { id: toastId });
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="overview-section mb-3">
        <h3>Orders History</h3>
        <div>
          {allOrdersData && (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={processOrdersData(allOrdersData?.orders)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
      <div className="overview-section mb-3">
        <h3>Recently Added</h3>
        <div>
          {productsData?.product?.map((item) => (
            <ManageSingleProduct
              key={item._id}
              item={item}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))}
        </div>
      </div>
      <div className="overview-section">
        <h3>Recently Ordered</h3>
        <div>
          {ordersData &&
            ordersData?.orders.map((item, index) => {
              return (
                <SingleOrder
                  item={item}
                  dashboardUser={userData?.user}
                  refetch={refetch}
                  key={index}
                />
              );
            })}
        </div>
      </div>
      <ManageModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default AdminOverview;
