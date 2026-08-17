'use client';

import Link from 'next/link';
import { Calendar, Check, GraduationCap, TrendingUp } from 'lucide-react';
import { registerUser } from '@/actions/sessionActions';
import { signUp } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import {toast} from "@/components/ui/toast";
import { useState } from 'react';
import SpinnerWithText from '@/components/shared/SpinnerWithText';
const appBenefits = [
	{
		icon: Calendar,
		description: 'Tantárgyak, jegyzetek és feladatok egyszerű kezelése',
	},
	{
		icon: Check,
		description: 'Vizsgaidőpontok, határidők és emlékeztetők egy helyen',
	},
	{
		icon: TrendingUp,
		description: 'Kövesd nyomon a tanulási folyamatodat és a fejlődésedet',
	},
];






export default function RegisterPage() {


	const [loading, setLoading] = useState(false);

	const handleSubmit = async  (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const form = Object.fromEntries(formData.entries());
		if(!form.firstName || !form.lastName || !form.email || !form.password || !form.passwordConfirmation){
			toast.add({
				title: 'Hiba történt a regisztráció során',
				description: 'Kérlek töltsd ki az összes mezőt.',
				type: 'error',
			  });
			  return;
		}
		if(form.password !== form.passwordConfirmation){
			toast.add({
				title: 'Hiba történt a regisztráció során',
				description: 'A jelszavak nem egyeznek.',
				type: 'error',
			  });
			  return;
		}
		await signUp.email({
			  name: form.firstName + ' ' + form.lastName,
			  email: form.email as string,
			  password: form.password as string,
			}, {
				onSuccess: () => {
				  toast.add({
					title: 'Sikeres regisztráció',
					description: 'Most már bejelentkezhetsz a fiókodba.',
					type: 'success',
				  });
				  setLoading(false);
				},
				onRequest: () => {
				  setLoading(true);
				  
				}
				,
				onError: (error) => {
				  toast.add({
					title: 'Hiba történt a regisztráció során',
					description: error.error.status === 422 ? 'Az email cím már használatban van.' : error.error.status === 400 ? 'A jelszó túl rövid' : 'Ismeretlen hiba történt. Kérlek próbáld újra később.',
					type: 'error',
				  });
				  setLoading(false);
				},			
			});

		
	}


	//TODO: implement password strength meter
	//TODO: implement buobles in the background of the right side of the page behind the form in the opposite corners

	const passwordStrength = (password: string) => {
		if (password.length < 6) {
			return 'Gyenge';
		} else if (password.length < 10) {
			return 'Közepes';
		} else {
			return 'Erős';
		}
	};


	return (
		<div className="flex min-h-screen w-full bg-background">
			<section className="hidden flex-1 max-w-2xl flex-col justify-between bg-secondary p-10 lg:flex xl:p-16">
				<div className="flex items-center gap-2">
					<GraduationCap className="h-7 w-7 text-primary" />
					<span className="text-2xl font-bold tracking-tight text-foreground">StudyTrack</span>
				</div>

				<div className="max-w-lg">
					<p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Tanulj tudatosabban</p>
					<h1 className="text-4xl font-bold leading-tight text-foreground xl:text-5xl">Kezdjük az egyetemi utad együtt!</h1>
					<p className="mt-5 text-lg leading-8 text-muted-foreground">Hozz létre egy fiókot, és tartsd kézben minden tanulmányi célodat egy helyen.</p>

					<div className="mt-10 flex flex-col gap-5">
						{appBenefits.map((benefit) => {
							const Icon = benefit.icon;
							return (
								<div key={benefit.description} className="flex items-center gap-4">
									<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
										<Icon className="h-5 w-5" />
									</span>
									<p className="text-sm leading-6 text-foreground">{benefit.description}</p>
								</div>
							);
						})}
					</div>
				</div>

				<p className="text-sm text-muted-foreground">A tanulásod. A ritmusod. A StudyTrack.</p>
			</section>

			<main className="flex w-full flex-1 items-center justify-center px-6 py-10 sm:px-10 lg:w-1/2">
				<div className="w-full bg-secondary p-7 border-border border  rounded-md max-w-md">
					<div className="mb-8 lg:hidden">
						<div className="flex items-center gap-2">
							<GraduationCap className="h-6 w-6 text-primary" />
							<span className="text-xl font-bold text-foreground">StudyTrack</span>
						</div>
					</div>

					<div className="mb-8">
						<h2 className="text-3xl font-bold tracking-tight text-foreground">Fiók létrehozása</h2>
						<p className="mt-2 text-sm text-muted-foreground">Kezd el a féléved nyomon követését</p>
					</div>

					<form className="space-y-5" onSubmit={(event) => handleSubmit(event)}>
						<div className="grid gap-5 sm:grid-cols-2">
							<div className="space-y-2">
								<label htmlFor="first-name" className="text-sm font-medium text-foreground">Keresztnév</label>
								<input id="first-name" name="firstName" type="text"  autoComplete="given-name" required className="h-11 w-full rounded-lg border border-primary bg-background/70 px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/20" />
							</div>
							<div className="space-y-2">
								<label htmlFor="last-name" className="text-sm font-medium text-foreground">Vezetéknév</label>
								<input id="last-name" name="lastName" type="text" autoComplete="family-name" required className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/20" />
							</div>
						</div>

						<div className="space-y-2">
							<label htmlFor="email" className="text-sm font-medium text-foreground">Email-cím</label>
							<input id="email" name="email" type="email" autoComplete="email" required className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/20" />
						</div>

						<div className="space-y-2">
							<label htmlFor="password" className="text-sm font-medium text-foreground">Jelszó</label>
							<input id="password" name="password" type="password" autoComplete="new-password" required className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/20" />
						</div>

						<div className="space-y-2">
							<label htmlFor="password-confirmation" className="text-sm font-medium text-foreground">Jelszó ismét</label>
							<input id="password-confirmation" name="passwordConfirmation" type="password" autoComplete="new-password" required className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/20" />
						</div>

						<button type="submit" disabled={loading} className="h-11 w-full disabled:cursor-not-allowed cursor-pointer rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/30"> {loading ? <SpinnerWithText  message='Fiók létrehozása....'/> : "Fiók létrehozása"} </button>
					</form>

					<p className="mt-6 text-center text-sm text-muted-foreground">
						Már van fiókod?{' '}
						<Link href="/login" className="font-semibold text-primary underline-offset-4 hover:underline">Jelentkezz be</Link>
					</p>
				</div>
			</main>
		</div>
	);
}
