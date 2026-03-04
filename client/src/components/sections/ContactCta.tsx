import { PhoneCall, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function ContactCta() {
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-[3fr,2fr] items-center gap-10 text-white">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Cần tư vấn về sản phẩm hoặc hợp tác?
            </h2>
            <p className="text-white/80 text-base md:text-lg max-w-2xl">
              Đội ngũ VINAAPACO luôn sẵn sàng trao đổi về nhu cầu nguyên liệu, sản phẩm quặng và các cơ hội hợp tác
              trong lĩnh vực khai thác, sản xuất phân bón và hóa chất.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Link href="/lien-he">
              <Button className="rounded-full h-11 px-6 text-sm md:text-base font-semibold shadow-lg bg-primary hover:bg-primary/90">
                <PhoneCall className="w-4 h-4 mr-2" />
                Liên hệ ngay
              </Button>
            </Link>
            <a href="mailto:info@vinaapaco.com">
              <Button
                variant="outline"
                className="rounded-full h-11 px-6 text-sm md:text-base font-semibold border-white/40 text-white hover:bg-white/10 hover:text-white"
              >
                <Mail className="w-4 h-4 mr-2" />
                Gửi email cho chúng tôi
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

