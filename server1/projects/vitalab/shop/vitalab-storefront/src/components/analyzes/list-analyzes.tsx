import { Card } from "@components/ui";

const ListAnalyzes = ({ children }) => {
  return (
    <div className="grid gap-y-2">
      <Card className="min-h-[20px] border border-gray-100 bg-white">
        <div className="grid gap-y-2 p-4">
          <div className="text-s text-gray-400"># 881</div>
          <div className="grid grid-cols-[1fr_100px] gap-x-10">
            <div className="">
              <h4 className="text-m font-semibold text-slate-800">
                ПЦР-тест на коронавирус SARS-CoV-2, мазок (PCR, Coronavirus
                SARS-CoV-2, nasopharyngeal and oropharyngeal smear)
              </h4>
              {children}
            </div>
            <div className="flex flex-col items-center justify-start">
              <div className="text-lg font-semibold leading-none text-slate-900">
                1 990 грн
              </div>
              <div className="">Замовити</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ListAnalyzes;
