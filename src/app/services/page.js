import PageHeader from '@/components/PageHeader';
import ServicesList from '@/components/ServicesList';

export default function ServicesPage() {
    return (
        <main className="bg-white">
            <PageHeader title="Our Services" subtitle="World-Class Logistics Solutions" />

            <ServicesList />

        </main>
    );
}
