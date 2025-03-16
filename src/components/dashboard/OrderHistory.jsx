import React, { useEffect, useState } from "react";
import { getOrders } from "../../services/tradeService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders(); 
        setOrders(response.data);
      } catch (err) {
        setError("Failed to load order history.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-gray-500">Loading order history...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Card className="mt-6 w-[90vw] mx-auto">
      <CardHeader>
        <CardTitle>📜 Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableCell className="font-semibold">Symbol</TableCell>
              <TableCell className="font-semibold">Type</TableCell>
              <TableCell className="font-semibold">Action</TableCell>
              <TableCell className="font-semibold">Quantity</TableCell>
              <TableCell className="font-semibold">Price</TableCell>
              <TableCell className="font-semibold">Status</TableCell>
              <TableCell className="font-semibold">Timestamp</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{order.symbol}</TableCell>
                <TableCell>{order.orderType}</TableCell>
                <TableCell className={order.action === "buy" ? "text-green-600" : "text-red-600"}>
                  {order.action.toUpperCase()}
                </TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>${order.price.toFixed(2)}</TableCell>
                <TableCell className={order.status === "executed" ? "text-green-500" : "text-yellow-500"}>
                  {order.status.toUpperCase()}
                </TableCell>
                <TableCell>{new Date(order.timestamp).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OrderHistory;
