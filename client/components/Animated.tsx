import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
}

export const AnimatedSection = ({ 
  children, 
  className, 
  delay = 0, 
  direction = 'up',
  duration = 0.6 
}: AnimatedSectionProps) => {
  const [ref, isVisible] = useScrollAnimation(0.1);

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 50, opacity: 0 };
      case 'down': return { y: -50, opacity: 0 };
      case 'left': return { x: -50, opacity: 0 };
      case 'right': return { x: 50, opacity: 0 };
      default: return { y: 50, opacity: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={isVisible ? { x: 0, y: 0, opacity: 1 } : getInitialPosition()}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggeredContainer = ({ children, className }: { children: ReactNode; className?: string }) => {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggeredItem = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FloatingIcon = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const HoverScale = ({ children, className, scale = 1.05 }: { 
  children: ReactNode; 
  className?: string; 
  scale?: number 
}) => {
  return (
    <motion.div
      whileHover={{ 
        scale, 
        transition: { duration: 0.2 } 
      }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ParticleBackground = () => {
  const particles = Array.from({ length: 50 }, (_, i) => i);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute w-1 h-1 bg-primary/20 rounded-full"
          initial={{
            x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1920,
            y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 1080,
          }}
          animate={{
            x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1920,
            y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 1080,
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export const GlowingButton = ({ children, className, ...props }: any) => {
  return (
    <motion.button
      whileHover={{
        boxShadow: "0 0 25px rgba(124, 58, 237, 0.5)",
        scale: 1.05
      }}
      whileTap={{ scale: 0.95 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
};
