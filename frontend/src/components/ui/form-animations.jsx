import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

// Toast-уведомления
export const showToast = (status, message) => {
  switch (status) {
    case 'success':
      toast.success(message, {
        duration: 3000,
        position: 'top-center',
      });
      break;
    case 'error':
      toast.error(message, {
        duration: 5000,
        position: 'top-center',
      });
      break;
    case 'loading':
      toast.loading(message, {
        position: 'top-center',
      });
      break;
    default:
      toast(message, {
        duration: 3000,
        position: 'top-center',
      });
  }
};

// Анимированный контейнер формы
export const FormContainer = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

// Анимированные поля ввода с обработкой ошибок
export const FormField = ({ error, children, animate = true }) => (
  <motion.div
    initial={animate ? { opacity: 0, x: -20 } : false}
    animate={animate ? { opacity: 1, x: 0 } : false}
    transition={{ duration: 0.2 }}
    className="space-y-2"
  >
    {children}
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="text-sm text-destructive mt-1"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </motion.div>
);

// Состояния кнопки
export const SubmitButton = ({ isSubmitting, children, ...props }) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
  >
    <button
      {...props}
      className={`${props.className} relative overflow-hidden`}
      disabled={isSubmitting}
    >
      <AnimatePresence>
        {isSubmitting ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-inherit"
          >
            <div className="h-5 w-5 border-t-2 border-b-2 border-current rounded-full animate-spin" />
          </motion.div>
        ) : null}
      </AnimatePresence>
      <span className={isSubmitting ? 'opacity-0' : ''}>
        {children}
      </span>
    </button>
  </motion.div>
);