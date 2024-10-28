import moment from "moment";

export const processOrdersData = (data) => {
  const monthlyData = {};

  data.forEach((item) => {
    const month = moment(item.createdAt).format("YYYY-MM");
    if (monthlyData[month]) {
      monthlyData[month]++;
    } else {
      monthlyData[month] = 1;
    }
  });

  return Object.keys(monthlyData).map((month) => ({
    month,
    orders: monthlyData[month],
  }));
};
