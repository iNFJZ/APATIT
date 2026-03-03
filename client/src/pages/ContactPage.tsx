import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                  <h1 className="text-4xl font-heading font-bold text-secondary mb-6">Liên Hệ Với Chúng Tôi</h1>
                  <p className="text-muted-foreground text-lg mb-10">Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của quý đối tác và khách hàng.</p>
                  
                  <div className="space-y-8">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-secondary mb-1">Địa chỉ trụ sở</h4>
                        <p className="text-muted-foreground">Đại lộ Trần Hưng Đạo, Phường Bắc Cường, TP Lào Cai, Tỉnh Lào Cai</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-secondary mb-1">Điện thoại</h4>
                        <p className="text-muted-foreground">0214 3852 252</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-secondary mb-1">Email</h4>
                        <p className="text-muted-foreground">info@vinaapaco.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Họ và tên</label>
                        <Input placeholder="Nguyễn Văn A" className="rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Số điện thoại</label>
                        <Input placeholder="090..." className="rounded-xl" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input type="email" placeholder="example@gmail.com" className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Lời nhắn</label>
                      <Textarea placeholder="Tôi muốn tìm hiểu về..." className="min-h-[150px] rounded-xl" />
                    </div>
                    <Button className="w-full rounded-xl py-6 text-lg">
                      Gửi tin nhắn <Send className="ml-2 w-5 h-5" />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="h-[400px] w-full bg-slate-200 grayscale">
          {/* Placeholder for Map */}
          <div className="w-full h-full flex items-center justify-center text-muted-foreground italic font-medium">
            Google Maps Integration Placeholder
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
