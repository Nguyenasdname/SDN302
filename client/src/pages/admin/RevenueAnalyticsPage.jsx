import { useState } from 'react';
import { Calendar, Download, DollarSign, TrendingUp, ShoppingBag, CreditCard, Users } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../../components/ui/table';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../../components/ui/card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';


// Mock data for charts
const dailyRevenue = [
    { date: 'Nov 1', revenue: 12500, bookings: 8 },
    { date: 'Nov 2', revenue: 15200, bookings: 10 },
    { date: 'Nov 3', revenue: 9800, bookings: 6 },
    { date: 'Nov 4', revenue: 18500, bookings: 12 },
    { date: 'Nov 5', revenue: 21000, bookings: 14 },
    { date: 'Nov 6', revenue: 16300, bookings: 11 },
    { date: 'Nov 7', revenue: 19800, bookings: 13 },
];

const revenueBreakdown = [
    { name: 'Resort Bookings', value: 245000, percentage: 65 },
    { name: 'Spa Services', value: 58000, percentage: 15 },
    { name: 'Food & Beverage', value: 46000, percentage: 12 },
    { name: 'Tours & Activities', value: 31000, percentage: 8 },
];

const COLORS = ['#14b8a6', '#fbbf24', '#f97316', '#8b5cf6'];

// Mock transaction data
const transactions = [
    { id: 'TXN001', bookingId: 'BK12345', customer: 'Nguyen Van A', date: '2025-11-05', type: 'Resort Deposit', amount: 3500 },
    { id: 'TXN002', bookingId: 'BK12346', customer: 'Tran Thi B', date: '2025-11-05', type: 'Spa Payment', amount: 850 },
    { id: 'TXN003', bookingId: 'BK12347', customer: 'Le Van C', date: '2025-11-04', type: 'Final Checkout', amount: 5200 },
    { id: 'TXN004', bookingId: 'BK12348', customer: 'Pham Thi D', date: '2025-11-04', type: 'F&B Payment', amount: 420 },
    { id: 'TXN005', bookingId: 'BK12349', customer: 'Hoang Van E', date: '2025-11-03', type: 'Resort Deposit', amount: 4100 },
    { id: 'TXN006', bookingId: 'BK12350', customer: 'Vo Thi F', date: '2025-11-03', type: 'Tour Payment', amount: 650 },
    { id: 'TXN007', bookingId: 'BK12351', customer: 'Dang Van G', date: '2025-11-02', type: 'Final Checkout', amount: 6800 },
    { id: 'TXN008', bookingId: 'BK12352', customer: 'Bui Thi H', date: '2025-11-02', type: 'Spa Payment', amount: 920 },
];

const RevenueAnalyticsPage = ({ onNavigate }) => {
    const [dateRange, setDateRange] = useState('last7days');
    const [sortColumn, setSortColumn] = useState('date');
    const [sortDirection, setSortDirection] = useState('desc');

    const totalRevenue = 380000;
    const revenueChange = 5.2;
    const totalBookings = 1247;
    const bookingsChange = 8.1;
    const resortRevenue = 245000;
    const resortChange = 4.8;
    const serviceRevenue = 135000;
    const serviceChange = 6.3;
    const avgBookingValue = 305;
    const avgChange = -2.1;

    const handleExportReport = () => {
        toast.success('Exporting revenue report to CSV...');
        // In a real app, this would trigger a CSV download
    };

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('desc');
        }
    };

    const sortedTransactions = [...transactions].sort((a, b) => {
        const direction = sortDirection === 'asc' ? 1 : -1;
        if (sortColumn === 'date') {
            return direction * a.date.localeCompare(b.date);
        }
        if (sortColumn === 'amount') {
            return direction * (a.amount - b.amount);
        }
        if (sortColumn === 'customer') {
            return direction * a.customer.localeCompare(b.customer);
        }
        return 0;
    });

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                    Revenue & Analytics Dashboard
                </h1>
                <p className="text-gray-600">
                    Track financial performance and analyze revenue trends
                </p>
            </div>

            {/* Date Range Selector */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                        <Calendar className="w-5 h-5 text-gray-500" />
                        <span className="text-sm">Date Range:</span>
                        <Select value={dateRange} onValueChange={setDateRange}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="today">Today</SelectItem>
                                <SelectItem value="last7days">Last 7 Days</SelectItem>
                                <SelectItem value="thismonth">This Month</SelectItem>
                                <SelectItem value="lastquarter">Last Quarter</SelectItem>
                                <SelectItem value="thisyear">This Year</SelectItem>
                                <SelectItem value="custom">Custom Range</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button
                            onClick={handleExportReport}
                            variant="outline"
                            className="ml-auto"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Export Report
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm text-gray-600">Total Revenue</CardTitle>
                            <DollarSign className="w-4 h-4 text-[#14b8a6]" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl mb-1">${totalRevenue.toLocaleString()}</div>
                        <div className="flex items-center gap-1 text-sm">
                            <TrendingUp className="w-3 h-3 text-green-600" />
                            <span className="text-green-600">+{revenueChange}%</span>
                            <span className="text-gray-500">vs last period</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm text-gray-600">Total Bookings</CardTitle>
                            <ShoppingBag className="w-4 h-4 text-[#fbbf24]" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl mb-1">{totalBookings}</div>
                        <div className="flex items-center gap-1 text-sm">
                            <TrendingUp className="w-3 h-3 text-green-600" />
                            <span className="text-green-600">+{bookingsChange}%</span>
                            <span className="text-gray-500">vs last period</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm text-gray-600">Resort Revenue</CardTitle>
                            <CreditCard className="w-4 h-4 text-[#14b8a6]" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl mb-1">${resortRevenue.toLocaleString()}</div>
                        <div className="flex items-center gap-1 text-sm">
                            <TrendingUp className="w-3 h-3 text-green-600" />
                            <span className="text-green-600">+{resortChange}%</span>
                            <span className="text-gray-500">vs last period</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm text-gray-600">Service Revenue</CardTitle>
                            <Users className="w-4 h-4 text-[#fbbf24]" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl mb-1">${serviceRevenue.toLocaleString()}</div>
                        <div className="flex items-center gap-1 text-sm">
                            <TrendingUp className="w-3 h-3 text-green-600" />
                            <span className="text-green-600">+{serviceChange}%</span>
                            <span className="text-gray-500">vs last period</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm text-gray-600">Avg Booking Value</CardTitle>
                            <DollarSign className="w-4 h-4 text-gray-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl mb-1">${avgBookingValue}</div>
                        <div className="flex items-center gap-1 text-sm">
                            <TrendingUp className="w-3 h-3 text-red-600 rotate-180" />
                            <span className="text-red-600">{avgChange}%</span>
                            <span className="text-gray-500">vs last period</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Over Time Chart */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Revenue Over Time</CardTitle>
                        <CardDescription>Daily revenue and booking trends</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={dailyRevenue}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="revenue" fill="#14b8a6" name="Revenue ($)" />
                                <Bar dataKey="bookings" fill="#fbbf24" name="Bookings" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Revenue Breakdown Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Revenue Breakdown</CardTitle>
                        <CardDescription>Revenue sources distribution</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={revenueBreakdown}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percentage }) => `${name} ${percentage}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {revenueBreakdown.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="mt-4 space-y-2">
                            {revenueBreakdown.map((item, index) => (
                                <div key={item.name} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: COLORS[index] }}
                                        />
                                        <span>{item.name}</span>
                                    </div>
                                    <span>${item.value.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Detailed Transaction List */}
            <Card>
                <CardHeader>
                    <CardTitle>Detailed Transaction List</CardTitle>
                    <CardDescription>All transactions within the selected date range</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead
                                        className="cursor-pointer hover:bg-gray-50"
                                        onClick={() => handleSort('id')}
                                    >
                                        Transaction ID
                                    </TableHead>
                                    <TableHead
                                        className="cursor-pointer hover:bg-gray-50"
                                        onClick={() => handleSort('bookingId')}
                                    >
                                        Booking ID
                                    </TableHead>
                                    <TableHead
                                        className="cursor-pointer hover:bg-gray-50"
                                        onClick={() => handleSort('customer')}
                                    >
                                        Customer Name
                                    </TableHead>
                                    <TableHead
                                        className="cursor-pointer hover:bg-gray-50"
                                        onClick={() => handleSort('date')}
                                    >
                                        Date {sortColumn === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
                                    </TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead
                                        className="cursor-pointer hover:bg-gray-50 text-right"
                                        onClick={() => handleSort('amount')}
                                    >
                                        Amount {sortColumn === 'amount' && (sortDirection === 'asc' ? '↑' : '↓')}
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sortedTransactions.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell>{transaction.id}</TableCell>
                                        <TableCell>
                                            <button
                                                className="text-[#14b8a6] hover:underline"
                                                onClick={() => toast.info(`Opening booking ${transaction.bookingId}`)}
                                            >
                                                {transaction.bookingId}
                                            </button>
                                        </TableCell>
                                        <TableCell>{transaction.customer}</TableCell>
                                        <TableCell>{transaction.date}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{transaction.type}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            ${transaction.amount.toLocaleString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <div className="text-sm text-gray-500">
                            Showing {sortedTransactions.length} transactions
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" disabled>
                                Previous
                            </Button>
                            <Button variant="outline" size="sm">
                                Next
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default RevenueAnalyticsPage