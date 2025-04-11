
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Plus, Search, Edit, Package, User, Eye, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Client type
interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  createdAt: Date;
}

// Order type
interface Order {
  id: string;
  clientId: string;
  product: string;
  quantity: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: Date;
}

const Clients: React.FC = () => {
  const { toast } = useToast();
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'أحمد محمد',
      phone: '0501234567',
      email: 'ahmed@example.com',
      address: 'الرياض، السعودية',
      createdAt: new Date('2023-01-15')
    },
    {
      id: '2',
      name: 'فاطمة علي',
      phone: '0559876543',
      email: 'fatima@example.com',
      address: 'جدة، السعودية',
      createdAt: new Date('2023-03-20')
    },
    {
      id: '3',
      name: 'محمد خالد',
      phone: '0561234567',
      email: 'mohammad@example.com',
      address: 'الدمام، السعودية',
      createdAt: new Date('2023-05-10')
    }
  ]);
  
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      clientId: '1',
      product: 'أكياس تسوق',
      quantity: 100,
      status: 'completed',
      createdAt: new Date('2023-02-01')
    },
    {
      id: '2',
      clientId: '1',
      product: 'أكياس ذات غالق',
      quantity: 50,
      status: 'pending',
      createdAt: new Date('2023-06-15')
    },
    {
      id: '3',
      clientId: '2',
      product: 'شنط قماش',
      quantity: 75,
      status: 'processing',
      createdAt: new Date('2023-04-05')
    },
    {
      id: '4',
      clientId: '3',
      product: 'شنط سوفت للمحلات الملابس',
      quantity: 200,
      status: 'completed',
      createdAt: new Date('2023-05-20')
    }
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [newClient, setNewClient] = useState<Omit<Client, 'id' | 'createdAt'>>({
    name: '',
    phone: '',
    email: '',
    address: ''
  });
  
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);
  const [newOrder, setNewOrder] = useState<Omit<Order, 'id' | 'createdAt'>>({
    clientId: '',
    product: '',
    quantity: 0,
    status: 'pending'
  });
  
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  
  // Filter clients based on search query
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone.includes(searchQuery) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Get client orders
  const getClientOrders = (clientId: string) => {
    return orders.filter(order => order.clientId === clientId);
  };
  
  // Add new client
  const handleAddClient = () => {
    if (!newClient.name || !newClient.phone) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال اسم العميل ورقم الهاتف",
        variant: "destructive"
      });
      return;
    }
    
    const id = (clients.length + 1).toString();
    const client: Client = {
      id,
      ...newClient,
      createdAt: new Date()
    };
    
    setClients([...clients, client]);
    setNewClient({
      name: '',
      phone: '',
      email: '',
      address: ''
    });
    setIsAddClientOpen(false);
    
    toast({
      title: "تم بنجاح",
      description: "تمت إضافة العميل الجديد",
    });
  };
  
  // Add new order
  const handleAddOrder = () => {
    if (!newOrder.clientId || !newOrder.product || newOrder.quantity <= 0) {
      toast({
        title: "خطأ",
        description: "يرجى إكمال جميع البيانات المطلوبة",
        variant: "destructive"
      });
      return;
    }
    
    const id = (orders.length + 1).toString();
    const order: Order = {
      id,
      ...newOrder,
      createdAt: new Date()
    };
    
    setOrders([...orders, order]);
    setNewOrder({
      clientId: '',
      product: '',
      quantity: 0,
      status: 'pending'
    });
    setIsAddOrderOpen(false);
    
    toast({
      title: "تم بنجاح",
      description: "تمت إضافة الطلب الجديد",
    });
  };
  
  // Delete client
  const handleDeleteClient = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا العميل؟ سيتم حذف جميع طلباته أيضاً.")) {
      setClients(clients.filter(client => client.id !== id));
      setOrders(orders.filter(order => order.clientId !== id));
      
      toast({
        title: "تم بنجاح",
        description: "تم حذف العميل وجميع طلباته",
      });
    }
  };
  
  // Status color mapping
  const statusColors = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'processing': 'bg-blue-100 text-blue-800',
    'completed': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800'
  };
  
  // Status display names
  const statusNames = {
    'pending': 'قيد الانتظار',
    'processing': 'قيد التنفيذ',
    'completed': 'مكتمل',
    'cancelled': 'ملغي'
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">إدارة العملاء والطلبات</h1>
        
        {/* Client management section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <User className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">العملاء</h2>
            </div>
            
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث عن عميل"
                  className="pl-8 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button
                onClick={() => setIsAddClientOpen(true)}
                className="gap-1"
              >
                <Plus className="h-4 w-4" />
                إضافة عميل
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">رقم</TableHead>
                    <TableHead>الاسم</TableHead>
                    <TableHead>رقم الهاتف</TableHead>
                    <TableHead>البريد الإلكتروني</TableHead>
                    <TableHead>العنوان</TableHead>
                    <TableHead>الطلبات</TableHead>
                    <TableHead className="text-left">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        لا يوجد عملاء مطابقين لبحثك
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredClients.map((client, index) => (
                      <TableRow key={client.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="font-medium">{client.name}</TableCell>
                        <TableCell dir="ltr" className="text-center">{client.phone}</TableCell>
                        <TableCell>{client.email || '-'}</TableCell>
                        <TableCell>{client.address || '-'}</TableCell>
                        <TableCell className="text-center">
                          {getClientOrders(client.id).length}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedClientId(client.id);
                                setNewOrder({...newOrder, clientId: client.id});
                                setIsAddOrderOpen(true);
                              }}
                            >
                              <Package className="h-4 w-4" />
                              طلب جديد
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-red-500"
                              onClick={() => handleDeleteClient(client.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        
        {/* Orders section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Package className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">الطلبات</h2>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">رقم</TableHead>
                    <TableHead>العميل</TableHead>
                    <TableHead>المنتج</TableHead>
                    <TableHead>الكمية</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>تاريخ الطلب</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        لا يوجد طلبات حالياً
                      </TableCell>
                    </TableRow>
                  ) : (
                    orders.map((order, index) => {
                      const client = clients.find(c => c.id === order.clientId);
                      return (
                        <TableRow key={order.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell className="font-medium">
                            {client?.name || 'عميل غير معروف'}
                          </TableCell>
                          <TableCell>{order.product}</TableCell>
                          <TableCell>{order.quantity}</TableCell>
                          <TableCell>
                            <span className={`px-3 py-1 rounded-full text-xs ${statusColors[order.status]}`}>
                              {statusNames[order.status]}
                            </span>
                          </TableCell>
                          <TableCell>
                            {order.createdAt.toLocaleDateString('ar-SA')}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        
        {/* Add client dialog */}
        <Dialog open={isAddClientOpen} onOpenChange={setIsAddClientOpen}>
          <DialogContent className="sm:max-w-md rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-xl">إضافة عميل جديد</DialogTitle>
              <DialogDescription>
                أدخل بيانات العميل الجديد
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  الاسم <span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  value={newClient.name}
                  onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                  className="modern-input"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  رقم الهاتف <span className="text-red-500">*</span>
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={newClient.phone}
                  onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                  className="modern-input ltr"
                  dir="ltr"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  البريد الإلكتروني
                </label>
                <Input
                  id="email"
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                  className="modern-input ltr"
                  dir="ltr"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium">
                  العنوان
                </label>
                <Input
                  id="address"
                  value={newClient.address}
                  onChange={(e) => setNewClient({...newClient, address: e.target.value})}
                  className="modern-input"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddClientOpen(false)}>
                إلغاء
              </Button>
              <Button type="button" onClick={handleAddClient}>
                إضافة العميل
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Add order dialog */}
        <Dialog open={isAddOrderOpen} onOpenChange={setIsAddOrderOpen}>
          <DialogContent className="sm:max-w-md rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-xl">إضافة طلب جديد</DialogTitle>
              <DialogDescription>
                {selectedClientId ? 
                  `إضافة طلب جديد للعميل: ${clients.find(c => c.id === selectedClientId)?.name}` : 
                  'أدخل بيانات الطلب الجديد'
                }
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              {!selectedClientId && (
                <div className="space-y-2">
                  <label htmlFor="clientId" className="text-sm font-medium">
                    العميل <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="clientId"
                    value={newOrder.clientId}
                    onChange={(e) => setNewOrder({...newOrder, clientId: e.target.value})}
                    className="modern-input w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                    required
                  >
                    <option value="">اختر العميل</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                  </select>
                </div>
              )}
              
              <div className="space-y-2">
                <label htmlFor="product" className="text-sm font-medium">
                  المنتج <span className="text-red-500">*</span>
                </label>
                <select
                  id="product"
                  value={newOrder.product}
                  onChange={(e) => setNewOrder({...newOrder, product: e.target.value})}
                  className="modern-input w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                  required
                >
                  <option value="">اختر المنتج</option>
                  <option value="أكياس تسوق">أكياس تسوق</option>
                  <option value="شنط قماش">شنط قماش</option>
                  <option value="أكياس ذات غالق">أكياس ذات غالق</option>
                  <option value="أكياس سلوفان بشريطه">أكياس سلوفان بشريطه</option>
                  <option value="شنط سوفت للمحلات الملابس">شنط سوفت للمحلات الملابس</option>
                  <option value="spoons&forks">Spoons & Forks</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="quantity" className="text-sm font-medium">
                  الكمية <span className="text-red-500">*</span>
                </label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={newOrder.quantity || ''}
                  onChange={(e) => setNewOrder({...newOrder, quantity: parseInt(e.target.value) || 0})}
                  className="modern-input ltr"
                  dir="ltr"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium">
                  الحالة
                </label>
                <select
                  id="status"
                  value={newOrder.status}
                  onChange={(e) => setNewOrder({...newOrder, status: e.target.value as Order['status']})}
                  className="modern-input w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                >
                  <option value="pending">قيد الانتظار</option>
                  <option value="processing">قيد التنفيذ</option>
                  <option value="completed">مكتمل</option>
                  <option value="cancelled">ملغي</option>
                </select>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddOrderOpen(false)}>
                إلغاء
              </Button>
              <Button type="button" onClick={handleAddOrder}>
                إضافة الطلب
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Footer />
    </div>
  );
};

export default Clients;
