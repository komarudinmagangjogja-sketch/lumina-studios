import { useEffect, useState } from "react";
import { api } from "../../lib/api";

type Faq = {
  id: number;
  question: string;
  answer: string;
};

export default function Faqs() {
  const [data, setData] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      const res = await api.get("/admin/faqs");
      setData(res.data);
    } catch (err) {
      console.error("Error fetching faqs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-10 bg-white min-h-screen text-black">
      <h1 className="text-2xl font-bold mb-6">FAQ</h1>

      <div className="space-y-3">
        {data.map((item) => (
          <div
            key={item.id}
            className="border rounded-xl p-4 cursor-pointer"
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
          >
            <div className="font-semibold">{item.question}</div>

            {openId === item.id && (
              <div className="text-gray-600 mt-2">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
