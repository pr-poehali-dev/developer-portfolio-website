
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import SocialIcon from "@/components/SocialIcon";

interface ContactSectionProps {
  onResumeDownload: () => void;
}

const ContactSection = ({ onResumeDownload }: ContactSectionProps) => {
  return (
    <section id="contact" className="py-16 sm:py-20 bg-accent/5">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12">
          <span className="text-accent font-mono">06.</span> Связаться со мной
        </h2>
        <div className="max-w-2xl mx-auto">
          <p className="text-base sm:text-lg mb-6 sm:mb-8">
            В настоящее время я открыт для новых возможностей и проектов. Если у
            вас есть вопрос или вы хотите обсудить потенциальное сотрудничество,
            свяжитесь со мной любым удобным способом.
          </p>
          <div className="flex justify-center flex-wrap gap-4 sm:space-x-6 mb-8 sm:mb-10">
            <SocialIcon platform="github" url="https://github.com" />
            <SocialIcon platform="linkedin" url="https://linkedin.com" />
            <SocialIcon platform="twitter" url="https://twitter.com" />
            <SocialIcon platform="telegram" url="https://t.me/username" />
          </div>
          <Button
            size="lg"
            onClick={onResumeDownload}
            className="bg-accent text-primary hover:bg-accent/90 w-full xs:w-auto"
          >
            <Icon name="FileDown" className="mr-2 h-5 w-5" />
            Скачать резюме
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
