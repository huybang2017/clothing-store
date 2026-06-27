import { redirect } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

export default function MissionPage() {
  redirect(ROUTES.company.vision);
}
