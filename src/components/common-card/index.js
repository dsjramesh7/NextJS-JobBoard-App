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
        group flex flex-col justify-between gap-6 p-6 md:p-8 
        rounded-3xl bg-white border border-gray-200 
        shadow-sm hover:shadow-xl hover:border-gray-300 
        transition-all duration-300 ease-in-out 
        hover:-translate-y-1 hover:scale-[1.02] cursor-pointer
      "
    >
      <CardHeader className="p-0 flex flex-col gap-3">
        {icon && (
          <div className="text-4xl text-gray-600 group-hover:text-gray-800 transition duration-200">
            {icon}
          </div>
        )}
        {title && (
          <CardTitle className="text-xl md:text-2xl font-semibold text-gray-900 group-hover:text-black transition-colors duration-200 truncate">
            {title}
          </CardTitle>
        )}
        {description && (
          <CardDescription className="mt-1 text-gray-600 text-sm md:text-base leading-relaxed">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      {footerContent && (
        <CardFooter className="p-0 mt-auto text-sm md:text-base text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
          {footerContent}
        </CardFooter>
      )}
    </Card>
  );
}

export default CommonCard;
