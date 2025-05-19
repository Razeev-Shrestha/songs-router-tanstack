import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
type CallToActionProps = {
  sectionsRef: any;
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};
export const CallToAction = ({ sectionsRef }: CallToActionProps) => {
  return (
    <motion.section
      ref={(el) => (sectionsRef.current[4] = el)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      className="w-full py-12 md:py-24 bg-primary text-primary-foreground"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Ready to Start Your Musical Journey?
            </h2>
            <p className="max-w-[600px] text-primary-foreground/80 md:text-xl/relaxed">
              Join thousands of music lovers and discover new songs every day.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link to="/register">
              <Button size="lg" variant="secondary" className="mt-4">
                Sign Up Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
