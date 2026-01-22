import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  as?: 'article' | 'section' | 'aside' | 'div';
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h2' | 'h3' | 'h4';
  id?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className, as: Component = 'article' }: CardProps) {
  return <Component className={cn('card', className)}>{children}</Component>;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return <header className={cn('mb-3', className)}>{children}</header>;
}

export function CardTitle({ children, className, as: Component = 'h3', id }: CardTitleProps) {
  return <Component id={id} className={cn('text-lg font-semibold', className)}>{children}</Component>;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn('', className)}>{children}</div>;
}
