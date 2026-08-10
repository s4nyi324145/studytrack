'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import {GraduationCap} from "lucide-react";


//TODO: Add font style

export default function RegisterPage() {
	return (
		<div className="flex min-h-screen flex-1  bg-foreground ">
		    <div className="w-full  flex flex-col bg-background p-8">
					<div className="flex gap-2 items-center">
						<GraduationCap className="mr-2 h-6 w-6 text-foreground" />
						<h1 className="text-2xl  text-foreground">StudyTrack</h1>
					</div>

					<h1 className="mt-6 text-2xl font-bold text-foreground">Egyetemi utad itt kezdődik</h1>
					 
			 </div>

			<div className="w-full max-w-md   p-8 shadow-md">
			</div>
		</div>
	);
}
