import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function CommonCard({ title, icon, description, footerContent }) {
  return (
    <Card
      className="
      flex flex-col gap-5 p-6 md:p-8 rounded-2xl bg-gray-100 
      transition-all duration-300 shadow-md shadow-gray-300/40 
      hover:bg-white hover:shadow-xl hover:scale-105 hover:shadow-gray-600/20
      cursor-pointer
    "
    >
      <CardHeader className="p-0 flex flex-col gap-2">
        {icon && <div className="text-gray-700 text-3xl">{icon}</div>}
        {title && (
          <CardTitle className="text-xl md:text-2xl font-semibold text-gray-950 truncate">
            {title}
          </CardTitle>
        )}
        {description && (
          <CardDescription className="mt-2 text-gray-600 text-sm md:text-base leading-relaxed">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardFooter className="p-0 mt-auto text-gray-700 text-sm md:text-base">
        {footerContent}
      </CardFooter>
    </Card>
  );
}

export default CommonCard;
