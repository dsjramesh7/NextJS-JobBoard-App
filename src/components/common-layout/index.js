import Header from "../header";

const CommonLayout = ({ children }) => {
  return (
    <div className="mx-auto max-w-7xl p-6 lg:px-8">
      {/* Header component */}
      <Header />
      {/* Header component */}

      {/* main component */}
      <main>{children}</main>
      {/* main component */}
    </div>
  );
};
export default CommonLayout;
