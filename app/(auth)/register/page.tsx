'use client';

import Link from 'next/link';
import { Calendar, Check, X,GraduationCap, TrendingUp, Eye, EyeClosed } from 'lucide-react';
import { signUp, signIn } from '@/lib/auth-client';
import { useRouter } from "next/navigation";
import {toast} from "@/components/ui/toast";
import { useState, useEffect } from 'react';
import SpinnerWithText from '@/components/shared/SpinnerWithText';
import type { RegisterPageForm } from '@/types/index';







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


	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState<RegisterPageForm>({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		passwordAgain: "",
	});
	const [passwordStrengthValue, setPasswordStrengthValue] = useState<number>(0);

	const handleSubmit = async  (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if(!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.password || !formData.passwordAgain){
			toast.add({
				title: 'Hiba történt a regisztráció során',
				description: 'Kérlek töltsd ki az összes mezőt.',
				type: 'error',
			  });
			  return;
		}
		if(formData.password !== formData.passwordAgain){
			toast.add({
				title: 'Hiba történt a regisztráció során',
				description: 'A jelszavak nem egyeznek.',
				type: 'error',
			  });
			  return;
		}
		if(passwordStrengthValue < 2){
			toast.add({
				title: 'Hiba történt a regisztráció során',
				description: 'A jelszó túl gyenge. Kérlek válassz egy erősebb jelszót.',
				type: 'error',
			  });
			  return;
		}
		if(formData.password.length < 8){
			toast.add({
				title: 'Hiba történt a regisztráció során',
				description: 'A jelszó túl rövid. Kérlek válassz egy legalább 8 karakter hosszú jelszót.',
				type: 'error',
			  });
			  return;
		}
		try {
			await signUp.email({
			  name: formData.firstName + ' ' + formData.lastName,
			  email: formData.email as string,
			  password: formData.password as string,
			
			}, {
				onSuccess: () => {
				  toast.add({
					title: 'Sikeres regisztráció',
					description: 'Most már bejelentkezhetsz a fiókodba.',
					type: 'success',
				  });
				  router.push('/login');
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
				
				},			
			});

		}
		catch (error) {
			console.log(error);
			toast.add({
				title: 'Hiba történt a regisztráció során',
				description: 'Ismeretlen hiba történt. Kérlek próbáld újra később.',
				type: 'error',
			  });
			  setLoading(false);
		}
		finally {
			setLoading(false);
		}
		
	}


	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};



	const passwordStrength = (password: string) => {
		
		let strength = 0;
		if (password.length >= 8) strength += 1;
		if (/[A-Z]/.test(password)) strength += 1;
		if (/[0-9]/.test(password)) strength += 1;
		if (/[^A-Za-z0-9]/.test(password)) strength += 1; 

		setPasswordStrengthValue(strength);
	};


	useEffect(() => {passwordStrength(formData.password)}, [formData.password]);

	//TODO: make separate component for the form and the benefits section, and make the form component reusable for login and register pages

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

			<main className="flex w-full flex-1 items-center justify-center relative px-6 py-10 sm:px-10 lg:w-1/2">
				
				{/* bubble */}
				{/* prefers-reduced-motion setting applied because some users may have this setting enabled and this setting reduces animations */}
				<div  className="absolute motion-reduce:animate-none top-0 left-0 w-40 h-40 bg-primary/40 rounded-full blur-3xl animate-pulse"></div>
				<div className="absolute motion-reduce:animate-none bottom-0 right-0 w-40 h-40 bg-primary/40 rounded-full blur-3xl animate-pulse"></div>

				
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


					{/* Social sign in */}
					{/* <div className="flex lg:flex-row flex-col gap-3">
						<button onClick={() => signIn.social({provider: "google"})} className="flex cursor-pointer items-center justify-center gap-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground transition hover:bg-accent hover:border-primary hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
							<img src="/google.svg" alt="Google logo" className="h-5 w-5" />
							Sign up with Google
						</button>
						<button onClick={() => signIn.social({provider: "github"})} className="flex cursor-pointer items-center justify-center gap-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground transition hover:bg-accent hover:border-primary hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
							<img src="/github.svg" alt="GitHub logo" className="h-5 w-5" />
							Sign up with GitHub
						</button>
					</div>

					<div className="relative my-6">
						<div className="absolute inset-0 flex items-center">
							<span className="w-full border-t border-border"></span>
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="bg-secondary px-2 text-muted-foreground">
								Vagy folytasd email címmel
							</span>
						</div>
					</div> */}

					<form className="space-y-5" onSubmit={(event) => handleSubmit(event)}>
						<div className="grid gap-5 sm:grid-cols-2">
							<div className="space-y-2">
								<label htmlFor="first-name" className="text-sm font-medium text-foreground">Keresztnév</label>
								<input id="first-name" value={formData.firstName} name="firstName" onChange={(event) => {handleInputChange(event)}} type="text"  autoComplete="given-name" required className="h-11 w-full rounded-lg border border-primary bg-background/70 px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/20" />
							</div>
							<div className="space-y-2">
								<label htmlFor="last-name" className="text-sm font-medium text-foreground">Vezetéknév</label>
								<input id="last-name" value={formData.lastName} name="lastName" onChange={(event) => {handleInputChange(event)}} type="text" autoComplete="family-name" required className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/20" />
							</div>
						</div>

						<div className="space-y-2">
							<label htmlFor="email" className="text-sm font-medium text-foreground">Email-cím</label>
							<input id="email" value={formData.email} name="email" type="email" onChange={(event) => {handleInputChange(event)}} autoComplete="email" required className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/20" />
						</div>

						<div className="space-y-2">
							<label htmlFor="password" className="text-sm font-medium text-foreground">Jelszó</label>
							<div className="relative">
								<input id="password" value={formData.password} name="password" onChange={(event) => {handleInputChange(event)}} type={showPassword ? "text" : "password"} autoComplete="new-password" required className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/20" />
								<button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition">
									{showPassword ? <EyeClosed size={20}/> : <Eye size={20}/>}
								</button>
							</div>
							<div className="mt-1 h-1 w-full rounded-full bg-muted">
								<div className={`h-1 transition-colors rounded-full ${passwordStrengthValue === 0 ? 'bg-red-500 w-1/4' : passwordStrengthValue === 1 ? 'bg-yellow-500 w-1/2' : passwordStrengthValue === 2 ? 'bg-yellow-400 w-3/4' : passwordStrengthValue >= 3 ? 'bg-green-500 w-full' : ''}`}></div>
							</div>
						    <div className="text-xs space-y-1.5 text-muted-foreground mt-1">
								<p className='flex gap-2 items-center'> {formData.password.length >= 8 ? <Check className='text-green-500' size={16}/> : <X className='text-red-500' size={16}/>} Legalább 8 karakter </p>
								<p className='flex gap-2 items-center'> {/\d/.test(formData.password) ? <Check className='text-green-500' size={16}/> : <X className='text-red-500' size={16}/>} Tartalmaz számot </p>
								<p className='flex gap-2 items-center'> {/[A-Z]/.test(formData.password) ? <Check className='text-green-500' size={16}/> : <X className='text-red-500' size={16}/>} Tartalmaz nagybetűt </p>
								<p className='flex gap-2 items-center'> {/[!@#$%^&*(),.?":{}|<>-]/.test(formData.password) ? <Check className='text-green-500' size={16}/> : <X className='text-red-500' size={16}/>} Tartalmaz speciális karaktert </p>
							</div>
						</div>

						<div className="space-y-2">
							<label htmlFor="password-confirmation" className="text-sm font-medium text-foreground">Jelszó ismét</label>
							<input id="password-confirmation" value={formData.passwordAgain} name="passwordAgain" onChange={(event) => {handleInputChange(event)}} type="password" autoComplete="new-password" required className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/20" />
							{formData.passwordAgain && formData.password !== formData.passwordAgain && (
								<p className="text-xs text-red-500 mt-1" aria-invalid="true">A jelszavak nem egyeznek.</p>
							)}
							
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
