import React from "react"
import { Award } from "lucide-react"
import { Card } from "@/Components/ui/card"

const AchievementInProfile = () => {
  const earned = 3
  const total = 10
  const progress = (earned / total) * 100

  return (
    <div className="w-full h-full">
      <Card className="rounded-3xl border-0 shadow-sm p-6 bg-white h-full">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Award className="h-6 w-6 text-amber-500" />
          Achievements & Certificates
        </h3>

        <div className="grid grid-cols-1 gap-6">
          {/* Progress Overview */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 flex items-center justify-between border border-blue-100">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Certificates</p>
              <h2 className="text-4xl font-extrabold text-blue-600 mt-1">{earned}</h2>
            </div>
            <div className="w-1/2">
              <div className="flex justify-between text-xs font-semibold text-gray-400 mb-2">
                <span>Progress</span>
                <span>{earned}/{total}</span>
              </div>
              <div className="h-3 w-full bg-white rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-gradient-to-r from-blue-400 to-indigo-600 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
              </div>
              <p className="text-xs text-indigo-400 mt-2 text-right">Unlock {total - earned} more!</p>
            </div>
          </div>

          {/* Certificate Cards */}
          <div className="space-y-4">
            {[
              { title: "React Advanced Patterns", date: "Dec 25, 2024", id: "CERT-001" },
              { title: "UI/UX Design Fundamentals", date: "Nov 28, 2024", id: "CERT-002" },
              { title: "Data Structures & Algorithms", date: "Nov 10, 2024", id: "CERT-003" }
            ].map((cert, index) => (
              <div key={index} className="group relative bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-amber-400"></div>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{cert.title}</h4>
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-500 font-mono text-[10px]">{cert.id}</span>
                      • Issued {cert.date}
                    </p>
                  </div>
                  <button className="p-2 bg-gray-50 text-gray-400 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors" title="Download Certificate">
                    <Award className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>

  )
}

export default AchievementInProfile
