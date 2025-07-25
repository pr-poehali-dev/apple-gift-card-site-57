import React, { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

interface CartItem {
  id: string;
  value: number;
  quantity: number;
}

const Index = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (value: number) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.value === value);
      if (existingItem) {
        return prev.map(item => 
          item.value === value 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: Date.now().toString(), value, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + (item.value * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const giftCardAmounts = [
    { value: 25, popular: false },
    { value: 50, popular: true },
    { value: 100, popular: true },
    { value: 200, popular: false },
    { value: 500, popular: false }
  ];

  const faqItems = [
    {
      question: "Как быстро я получу код карты?",
      answer: "Код подарочной карты отправляется автоматически на вашу электронную почту сразу после оплаты. Обычно это занимает не более 2-3 минут."
    },
    {
      question: "Можно ли использовать карту в российском App Store?",
      answer: "Да, наши карты работают во всех регионах App Store. Вы можете использовать их для покупки приложений, игр, подписок и других цифровых товаров."
    },
    {
      question: "Есть ли срок действия у подарочной карты?",
      answer: "Подарочные карты Apple не имеют срока действия. Вы можете активировать их в любое удобное время после покупки."
    },
    {
      question: "Какие способы оплаты вы принимаете?",
      answer: "Мы принимаем банковские карты Visa, Mastercard, МИР, а также электронные кошельки и криптовалюту."
    },
    {
      question: "Что делать, если код не пришел?",
      answer: "Проверьте папку спам в вашей почте. Если письма нет, свяжитесь с нашей поддержкой через форму обратной связи или Telegram."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Icon name="Gift" size={24} className="text-apple-blue" />
              <span className="text-xl font-semibold">Apple Gift Cards</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#catalog" className="text-gray-600 hover:text-black transition-colors">Каталог</a>
              <a href="#faq" className="text-gray-600 hover:text-black transition-colors">FAQ</a>
              <a href="#contacts" className="text-gray-600 hover:text-black transition-colors">Контакты</a>
              <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-apple-blue hover:bg-blue-600 text-white relative">
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    Корзина
                    {getTotalItems() > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center p-0">
                        {getTotalItems()}
                      </Badge>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Icon name="ShoppingCart" size={20} />
                      Корзина ({getTotalItems()})
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {cartItems.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 opacity-50" />
                        <p>Корзина пуста</p>
                        <p className="text-sm">Добавьте подарочные карты из каталога</p>
                      </div>
                    ) : (
                      <>
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center text-white text-xs font-bold">
                                $
                              </div>
                              <div>
                                <p className="font-medium">${item.value} USD</p>
                                <p className="text-sm text-gray-500">Поварочная карта</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button 
                                size="icon" 
                                variant="outline" 
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Icon name="Minus" size={14} />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button 
                                size="icon" 
                                variant="outline" 
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Icon name="Plus" size={14} />
                              </Button>
                              <Button 
                                size="icon" 
                                variant="ghost" 
                                className="h-8 w-8 text-red-500 hover:text-red-700"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Icon name="Trash2" size={14} />
                              </Button>
                            </div>
                          </div>
                        ))}
                        <Separator />
                        <div className="space-y-4">
                          <div className="flex justify-between items-center font-semibold text-lg">
                            <span>Итого:</span>
                            <span>${getTotalPrice()}</span>
                          </div>
                          <Button className="w-full bg-apple-blue hover:bg-blue-600 text-white" size="lg">
                            <Icon name="CreditCard" size={20} className="mr-2" />
                            Оформить заказ
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full" 
                            onClick={() => setIsCartOpen(false)}
                          >
                            Продолжить покупки
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-apple-darkGray mb-6">
                Поварочные карты
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Лучшие рецепты и кулинарные секреты от профессиональных поваров. Мгновенный доступ к кулинарным мастер-классам.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-apple-blue hover:bg-blue-600 text-white">
                  Выбрать карту
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
                <Button size="lg" variant="outline">
                  <Icon name="ChefHat" size={20} className="mr-2" />
                  Как готовить
                </Button>
              </div>
              <div className="flex items-center gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <Icon name="Zap" size={20} className="text-apple-blue" />
                  <span className="text-sm text-gray-600">Мгновенный доступ</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Shield" size={20} className="text-apple-blue" />
                  <span className="text-sm text-gray-600">Проверенные рецепты</span>
                </div>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <img 
                src="/img/7a822eab-10cf-4f9c-aaff-66eebb886d83.jpg" 
                alt="Поварочная карта"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-lg animate-fade-in" style={{animationDelay: '0.3s'}}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Icon name="Check" size={24} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Шеф-повар онлайн</p>
                    <p className="text-xs text-gray-500">Всегда поможет</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-apple-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-apple-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Clock" size={32} className="text-apple-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Мгновенный доступ</h3>
              <p className="text-gray-600">Доступ к рецептам сразу после покупки</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-apple-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={32} className="text-apple-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Качественные рецепты</h3>
              <p className="text-gray-600">Только проверенные рецепты от шеф-поваров</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-apple-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="HeadphonesIcon" size={32} className="text-apple-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Кулинарная поддержка</h3>
              <p className="text-gray-600">Помощь в освоении рецептов и техник</p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-apple-darkGray mb-4">Выберите карту</h2>
            <p className="text-xl text-gray-600">Поварочные карты для разного уровня мастерства</p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {giftCardAmounts.map((amount) => (
              <Card 
                key={amount.value}
                className={`relative cursor-pointer transition-all hover:scale-105 ${
                  selectedAmount === amount.value ? 'ring-2 ring-apple-blue' : ''
                }`}
                onClick={() => setSelectedAmount(amount.value)}
              >
                {amount.popular && (
                  <Badge className="absolute -top-2 -right-2 bg-apple-blue">
                    Популярно
                  </Badge>
                )}
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold mb-2">${amount.value}</div>
                  <div className="text-sm text-gray-500 mb-4">USD</div>
                  <Button 
                    variant={selectedAmount === amount.value ? "default" : "outline"}
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(amount.value);
                    }}
                  >
                    <Icon name="Plus" size={16} className="mr-2" />
                    В корзину
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button 
              size="lg" 
              className="bg-apple-blue hover:bg-blue-600 text-white" 
              disabled={cartItems.length === 0}
              onClick={() => setIsCartOpen(true)}
            >
              <Icon name="ShoppingCart" size={20} className="mr-2" />
              Посмотреть корзину {cartItems.length > 0 && `(${getTotalItems()} шт.)`}
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-apple-gray">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-apple-darkGray mb-4">Часто задаваемые вопросы</h2>
            <p className="text-xl text-gray-600">Все, что нужно знать о покупке</p>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-medium">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-apple-blue to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Готовы сделать подарок?</h2>
          <p className="text-xl mb-8 opacity-90">
            Подарочная карта Apple — идеальный выбор для любого случая
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary">
              <Icon name="Gift" size={20} className="mr-2" />
              Купить карту
            </Button>
            <Button size="lg" variant="ghost" className="text-white hover:text-white hover:bg-white/20">
              <Icon name="MessageCircle" size={20} className="mr-2" />
              Связаться с нами
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacts" className="py-12 bg-apple-darkGray text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="ChefHat" size={24} />
                <span className="text-xl font-semibold">Поварочные карты</span>
              </div>
              <p className="text-gray-400">Лучшие кулинарные рецепты и мастер-классы</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Покупателям</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Как купить</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Гарантии</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Возврат</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Поддержка</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <a href="mailto:support@giftcards.com" className="hover:text-white transition-colors">
                    support@giftcards.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MessageCircle" size={16} />
                  <a href="#" className="hover:text-white transition-colors">Telegram</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Мы принимаем</h3>
              <div className="flex gap-4">
                <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center">
                  <Icon name="CreditCard" size={20} />
                </div>
                <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center">
                  <Icon name="Wallet" size={20} />
                </div>
                <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center">
                  <Icon name="Bitcoin" size={20} />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Apple Gift Cards. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;