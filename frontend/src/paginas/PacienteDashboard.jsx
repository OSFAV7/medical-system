import AgendarCita from '../components/AgendarCita';
import VerCitas from '../components/VerCitas';


export default function PacienteDashboard() {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <AgendarCita />
        </div>
        <div className="flex-1">
          <VerCitas />
     
        </div>
      </div>
    </div>
  );
}
