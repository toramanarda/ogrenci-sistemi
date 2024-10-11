import Header from "@/components/Header";
import StudentTable from "@/components/StudentTable/serverStudentTable"

export default function UserLayout({ children }) {
  return (
    <div className="admin-dashboard">
      <Header />
      <StudentTable />
      {children}
    </div>
  )
}