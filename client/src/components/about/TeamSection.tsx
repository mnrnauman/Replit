import { leadershipTeam } from '@/lib/data';
import { Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

interface LeadershipMember {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  linkedin?: string;
  email?: string;
}

const TeamSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {(leadershipTeam as LeadershipMember[]).map((member, index) => (
        <motion.div 
          key={member.name} 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="bg-[#1e2e4a] rounded-xl overflow-hidden border border-gray-800 card-hover"
        >
          <div className="h-64 overflow-hidden">
            <img 
              src={member.imageUrl} 
              alt={member.name} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
            <p className="text-[#FFA94D] font-medium mb-4">{member.role}</p>
            <p className="text-[#D1D5DB] mb-6">{member.bio}</p>
            <div className="flex space-x-4">
              {member.linkedin && (
                <a 
                  href={member.linkedin} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D1D5DB] hover:text-[#FFA94D] transition-colors duration-300"
                  aria-label={`${member.name}'s LinkedIn profile`}
                >
                  <Linkedin size={20} />
                </a>
              )}
              {member.email && (
                <a 
                  href={`mailto:${member.email}`} 
                  className="text-[#D1D5DB] hover:text-[#FFA94D] transition-colors duration-300"
                  aria-label={`Email ${member.name}`}
                >
                  <Mail size={20} />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TeamSection;
