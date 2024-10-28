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
import SingleOrder from "../../../../../components/ShowOrders/SingleOrder";
import useGlobalContext from "../../../../../hooks/useGlobalContext";
import {
  useGetLastestThreeOrdersQuery,
  useGetSingleUserOrdersQuery,
} from "../../../../../redux/features/orders/ordersApi";
import { useGetSingleUserQuery } from "../../../../../redux/features/user/userApi";
import { processOrdersData } from "../../../../../utils/processOrdersData";
import "./UserOverview.css";
import ReactLoader from "../../../../../components/ReactLoading/ReactLoader";

const UserOverview = () => {
  const { firebase } = useGlobalContext();
  const { user } = firebase;
  const { data: userData } = useGetSingleUserQuery(user?.email);
  const { data, refetch, isFetching } = useGetLastestThreeOrdersQuery(
    user?.email
  );
  const { data: ordersData } = useGetSingleUserOrdersQuery(user?.email);

  return (
    <>
      <div className="overview-section mb-3">
        <h3>Recent Orders</h3>
        <div>
          {isFetching && <ReactLoader type={"spin"} color={"red"} />}
          {data?.orders?.length === 0 && <p>No orders made yet!</p>}
          {userData &&
            data &&
            data.orders.map((item, index) => {
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
      <div className="overview-section">
        <h3>Orders History</h3>
        <div>
          {ordersData && (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={processOrdersData(ordersData?.orders)}>
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
    </>
  );
};

export default UserOverview;
