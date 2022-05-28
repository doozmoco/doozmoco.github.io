
			% Bisection method

				clc;clear
				Initials 
				f=@(x) cos(x)-x.*exp(x);
				a = 0; % initial guess 1
				b = 1; % initial guess 2
				e = 1e-8; % tolerance
				
				% Finding Functional Value
				fa = f(a);
				fb = f(b);
				
				% Implementing Bisection Method
				if fa*fb > 0 <br>
					disp('Given initial values do not bracket the root.');
				else
					c = (a+b)/2;<br>
					fc = f(c);<br>
					while abs(fc)>e<br>
						fprintf('%f\t%f\t%f\t%f\n',a,b,c,fc);<br>
						if fa*fc< 0<br>
							b =c;<br>
						else<br>
							a =c;<br>
						end<br>
						c = (a+b)/2;<br>
						fc = f(c);<br>
					end<br>
					fprintf('\nRoot is: %f\n', c);<br>
				end<br>
			
			% Regula-Falsi method
				% Clearing Screen<br>
				clc<br>
				clear<br>
				% Input Section<br>
				f=@(x) cos(x)-x.*exp(x);<br>
				a = 0; % initial guess 1<br>
				b = 1; % initial guess 2<br>
				e = 1e-8; % tolerance<br>
				% Finding Functional Value<br>
				fa = f(a);<br>
				fb = f(b);<br>
				c = a - (a-b) * fa/(fa-fb);<br>
				fc = f(c);<br>
				while abs(fc)>e<br>
    			fprintf('%f\t%f\n',c,fc);<br>
  				a =b;<br>
    			b =c;<br>
   				fa = fb;<br>
    			fb = fc;<br>
   				c = a - (a-b) * fa/(fa-fb);<br>
    			fc = f(c);<br>
				end<br>
				fprintf('\nRoot is: %f\n', c);<br>
				
				


		% Newton-Raphson method
				% Clearing Screen<br>
				clc<br>
				clear<br>
				% Input Section<br>
				f=@(x) cos(x)-x.*exp(x);<br>
				a = 0; % initial guess 1<br>
				e = 1e-8; % tolerance<br>
				% Finding Functional Value<br>
				fa = f(a);<br>
				c = a - fa/f(a);<br>
				fc = f(c);<br>
				while abs(fc)>e<br>
				fprintf('%f\t%f\n',c,fc);<br>
  				a =c;<br>
   				fa = fc;<br>
   				c = a - fa/f(a);<br>
				fc = f(c);<br>
				end<br>
				fprintf('\nRoot is: %f\n', c);<br>
				
				
		 Secant method
				% Clearing Screen<
				clc<br>
				clear<br>
				% Input Section<br>
				f=@(x) cos(x)-x.*exp(x);<br>
				a = 0; % initial guess 1<br>
				b = 1; % initial guess 2<br>
				e = 1e-8; % tolerance<br>
				% Finding Functional Value<br>
				fa = f(a);<br>
				fb = f(b);<br>
				c = a - fa*(b-a)/(fb-fa);<br>
				fc = f(c);<br>
				while abs(fc)>e<br>
				fprintf('%f\t%f\n',c,fc);<br>
  				a =b;<br>
				b =c;<br>
   				fa = fb;<br>
				fb = fc;<br>
   				c = a - fa*(b-a)/(fb-fa);<br>
				fc = f(c);<br>
				end<br>
				fprintf('\nRoot is: %f\n', c);<br>
				
				
		% Fixed Point method
				% Clearing Screen
				clc<br>
				clear<br>
				% Input Section<br>
				f=@(x) cos(x)-x.*exp(x);<br>
				a = 0; % initial guess 1<br>
				e = 1e-8; % tolerance<br>
				% Finding Functional Value<br>
				fa = f(a);<br>
				c = a - fa/f(a);<br>
				fc = f(c);<br>
				while abs(fc)>e<br>
				fprintf('%f\t%f\n',c,fc);<br>
  				a =c;<br>
   				fa = fc;<br>
   				c = a - fa/f(a);<br>
				fc = f(c);<br>
				end<br>
				fprintf('\nRoot is: %f\n', c);<br>
				
				
	Modified Secant method
				% Clearing Screen<br>
				clc<br>
				clear<br>
				% Input Section<br>
				f=@(x) cos(x)-x.*exp(x);<br>
				a = 0; % initial guess 1<br>
				b = 1; % initial guess 2<br>
				e = 1e-8; % tolerance<br>
				% Finding Functional Value<br>
				fa = f(a);<br>
				fb = f(b);<br>
				c = a - fa*(b-a)/(fb-fa);<br>
				fc = f(c);<br>
				while abs(fc)>e<br>
				fprintf('%f\t%f\n',c,fc);<br>
  				a =b;<br>
				b =c;<br>
   				fa = fb;<br>
				fb = fc;<br>
   				c = a - fa*(b-a)/(fb-fa);<br>
				fc = f(c);<br>
				end<br>
				fprintf('\nRoot is: %f\n', c);
				
				
				% really what?
				clear;<br>
				clc;<br>

				%# Initials <br>
				g=@(x) cos(x).*exp(-x);<br>

				tol=1e-5;<br>
				N=1000;<br>

				%# Initial iterations<br>
				x1 = 0;<br>
				x2 = g(x1);<br>

				iterations = 0;% # iteration counter<br>
				% iteration loop<br>
				while (abs(x2-x1) > tol && iterations<N)<br>
    			iterations = iterations + 1;<br>
   				x1 = x2;<br>
    			x2 = g(x1);<br>
    			if iterations==N<br>
       			error('Program reached the maximum number of iterations')<br>
   						end<br>
					end<br>
				fprintf('Found root is:%f\n',x2)<br>
				fprintf('Total number of iteration required: %d\n',iterations)<br>


				%# Initials <br>
				g=@(x) cos(x).*exp(-x);<br>

				tol=1e-5;<br>
				N=1000;<br>

				%# Initial iterations<br>
				x1 = 0;<br>
				x2 = g(x1);<br>

				iterations = 0;% # iteration counter<br>
				% iteration loop<br>
				while (abs(x2-x1) > tol && iterations<N)<br>
				iterations = iterations + 1;<br>
   				x1 = x2;<br>
				x2 = g(x1);<br>
				if iterations==N<br>
	   			error('Program reached the maximum number of iterations')<br>
   						end<br>
					end<br>
				fprintf('Found root is:%f\n',x2)<br>
				fprintf('Total number of iteration required: %d\n',iterations)<br>
			
				% Define the function, Jacobian<br>
				% We assume X=[x;y], that means x=X(1) and y=X(2)<br>
				F=@(X) [X(2)*cos(X(1)*X(2))+1;<br>
						sin(X(1)*X(2))+X(1)-X(2)];<br>
				J=@(X) [-X(2)^2*sin(X(1)*X(2)),   cos(X(1)*X(2))-X(1)*X(2)*sin(X(1)*X(2));<br>
						 X(2)*cos(X(1)*X(2))+1,   X(1)*cos(X(1)*X(2))-1];<br>
				% other inputs<br>
				tol=1e-4;<br>
				N=1000;<br>
				X0=[1;2];<br>
				% Initialise X1;<br>
				for i=1:N<br>
					% the method<br>
					X1=X0-inv(J(X0))*F(X0);  % Use 'X1=X0-J(X0)\F(X0);' for faster clculation<br>
					% stopping criterion<br>
					if norm(X1-X0,Inf)<tol<br>
						disp("The root is")<br>
						disp(X1)<br>
						break;<br>
					end<br>
					% prepare for next iteration<br>
					X0=X1;<br>
				end<br>
				if i==N<br>
					disp('method fails')<br>
				end<br>
%simpsons rule
				x=[1,2,3,4];<br>
				fx=[1.65,2.70,4.5,7.35];<br>
				y=log10(fx);<br>
				LHS_Mat=[length(x),sum(x);sum(x),sum(x.^2)];<br>
				RHS_Vec=[sum(y);sum(y.*x)];<br>
				C=LHS_Mat\RHS_Vec;<br>
				a=10^C(1)<br>
				b=C(2)/log10(exp(1))<br>
				

			all integration rules</center>
				%% MA2208-Numerical Methods (Dept. of Maths, Mahindra University)<br>
				%Problem 2, Tutorial 5<br>
				f=@(x) sin(x);<br>
				a=0;b=pi;<br>
				n=6;<br>
				x=linspace(0,pi,n+1);<br>
				y=f(x);<br>
				I_excat=2;<br>
				I_rect=comp_rectangle_rule(x,y)<br>
				pointwise_err=abs(I_excat-I_rect)<br>
				<br>
				I_midp=comp_midpoint_rule(x,f)<br>
				pointwise_err=abs(I_excat-I_midp)<br>
				<br>
				I_trap=comp_trapezoidal_rule(x,y)<br>
				pointwise_err=abs(I_excat-I_trap)<br>
				
				I_simp=comp_simpson_rule(x,y)<br>
				pointwise_err=abs(I_excat-I_simp)<br>
				
				function I=comp_rectangle_rule(x,y)<br>
				h=x(2)-x(1);<br>
				I=(h)*(sum(y(1:end-1)));<br>
				end<br>
				
				function I=comp_midpoint_rule(x,f)<br>
				h=x(2)-x(1);<br>
				y_mid=f(x(1:end-1)+h/2);<br>
				I=h*sum(y_mid);<br>
				end<br>
				
				function I=comp_trapezoidal_rule(x,y)<br>
				h=x(2)-x(1);<br>
				I=(h/2)*(y(1)+2*sum(y(2:end-1))+y(end));<br>
				end<br>
				
				function I=comp_simpson_rule(x,y)<br>
				h=x(2)-x(1);<br>
				I=(h/3)*(y(1)+4*sum(y(2:2:end-1))+2*sum(y(3:2:end-1))+y(end));<br>
				end<br>
			%actual simp</center><br>
				%% MA2208-Numerical Methods (Dept. of Maths, Mahindra University)<br>
				%Problem 3, Tutorial 5<br>
				h=0.125;<br>
				a=0;b=1;<br>
				x=a:h:b;<br>
				f=@(x) sqrt(2/pi)*exp(-0.5*x.^2);<br>
				y=f(x);<br>
				I_simp=simpson_rule(x,y)<br>
				
				function I=simpson_rule(x,y)<br>
				h=x(2)-x(1);<br>
				I=(h/3)*(y(1)+4*sum(y(2:2:end-1))+2*sum(y(3:2:end-1))+y(end));<br>
				end<br>
MA2208-Numerical Methods (Dept. of Maths, Mahindra University)<br>
				<center>%Problem 7, Tutorial 5</center>
				
				f=@(t) 0.5*cos(t+5)./(1+sin(0.5*(t+5)));<br>
				
				nodes_2=[-sqrt(1/3),sqrt(1/3)];<br>
				weights_2=[1,1];<br>
				
				nodes_3=[-sqrt(3/5),0,sqrt(3/5)];<br>
				weights_3=[5/9,8/9,5/9];<br>
				
				I_GL2=weights_2*f(nodes_2)'<br>
				I_GL3=weights_3*f(nodes_3)'<br>
		%lauda euler anta</center>
				
				clear<br>
				f=@(t,u) -2 .*t .*u.^2;<br>
				h=0.1;<br>
				a=0;b=1;<br>
				n=(b-a)/h;<br>
				uj=1; % u(0)=1 is given<br>
				for j=0:n-1<br>
					tj=a+j*h;<br>
					uj=uj+h*f(tj,uj)<br>
				end<br>
			rk2 na modda</center>
				clear<br>
				f=@(t,u) -2 .*t .*u.^2;<br>
				h=0.1;<br>
				a=0;b=1;<br>
				n=(b-a)/h;<br>
				uj=1; % u(0)=1 is given<br>
				for j=0:n-1<br>
					tj=a+j*h;<br>
					K1=h*f(tj,uj);<br>
					K2=h*f(tj+h,uj+K1);<br>
					uj=uj+(1/2)*(K1+K2)<br>
				end<br>
rk4 dengai</center>
				clear<br>
				f=@(t,u) -2 .*t .*u.^2;<br>
				h=0.1;<br>
				a=0;b=1;<br>
				n=(b-a)/h;<br>
				uj=1; % u(x_0)=u(0)=1 is given <br>
				for j=0:n-1<br>
					tj=a+j*h;<br>
					K1=h*f(tj,uj);<br>
					K2=h*f(tj+0.5*h,uj+0.5*K1);<br>
					K3=h*f(tj+0.5*h,uj+0.5*K2);<br>
					K4=h*f(tj+h,uj+K3);<br>
					uj=uj+(1/6)*(K1+2*K2+2*K3+K4) % u(x_(j+1))<br>
				end<br>

			>%Newton divided difference interpolation</center>
				x=[0,1,2,4,5,6];<br>

				y=[1,14,15,5,6,19];<br>
				
				xq=1.5 ;<br>
				n=length(x);<br>

				D=zeros(n);<br>
				
				D(:,1) = y;<br>
				
				for j = 2:n<br>
				
				for i = j:n<br>
				
				D(i,j)=(D(i,j-1)-D(i-1,j-1))/(x(i)-x(i-j+1));<br>
				
					end<br>
				
				end<br>
				fxq = 0;<br>

				mult=1;<br>
				
				for i = 1:n<br>
				
				fxq =fxq + mult*D(i,i);<br>
				
				mult=mult*(xq-x(i));<br>
				
				end<br>
				fxq<br>

lagrange_interpolation</center>
				x=[0,1,2,4,5,6];<br>

				y=[1,14,15,5,6,19];<br>
				
				xq=1.5 ;<br>
				yq=lagrange_interpolation(x,y,xq)<br>
				function yq=lagrange_interpolation(x,y,xq)<br>

				n=length(x); % total number of data<br>
				for i=1:n<br>

					mult=1;<br>
				
					for j=1:n<br>
				
						if (i~=j)<br>
				
							mult=mult*(xq-x(j))/(x(i)-x(j));<br>
							end<br>

							L(i)=mult;<br>
							
							end<br>
				
					end<br>
					sum=0;<br>

					for i=1:n<br>
				
						sum=sum+y(i)*L(i);<br>
				
					end<br>
				
					yq=sum;<br>
				
				end<br>
Gauss elemination</center>
				% Define the matrix A and the vector b.<br>

				A = [1, 1, 1; 4, 3, -1; 3, 5, 3];<br>
				
				b= [1; 6; 4];<br>
				
				% Find out the order of the matrix A<br>
				
				n= length(A);<br>
				
				% Initialize x<br>
				
				x = zeros(n,1);<br>
				% Remember we need n-1 step for the elemination?? Therefore, k=1 to n-1.<br>

				for k=1:n-1<br>
				% Remember we need to eleminate x_k from E(k+1) to E(n). Therfore j=k+1 to n.<br>

					for j=k+1:n<br>
				
				% we need to calculate the multiplier.<br>
				
						m = A(j,k)/A(k,k);<br>
				
				% Doing E(j)=E(j)-m_(jk)*E(k)<br>
				
						A(j,:) = A(j,:) - m*A(k,:);<br>
				
					b(j)= b(j)-m*b(k);<br>
				
					end<br>
				
				end<br>
				x(n) = b(n)/A(n,n);<br>

				for i=n-1:-1:1<br>
				
					x(i,:) = (b(i) - A(i,i+1:n)*x(i+1:n))/A(i,i);<br>
				
				end<br>
				<center>GE complete pivot</center>
				%% Solving system of equation using Gaussian elemination method.<br>
				clear<br>
				% Define the matrix A and the vector b. <br>
				A = [1, 2, -1; 2, 1, -2; -3, 1, 1];<br>
				b= [3; 3; -6];     <br>
				
				% Find out the order of the matrix A<br>
				n= length(A); <br>
				
				% Initialize x<br>
				x = zeros(n,1); <br>
				x_ind=1:n;<br>
				% Forward elemination:<br>
				% Remember we need n-1 step for the elemination?? Therefore, k=1 to n-1.<br>
				for k=1:n-1<br>
				
	%Complete Pivoting<br>
				B=A(k:n,k:n);<br>
				[P,Q]=find(abs(B)==max(abs(B),[],'all'));<br>
				p=P(1)+k-1; q=Q(1)+k-1;<br>
				
				% interchange p-th and k-th row<br>
				A([k,p],:)=A([p,k],:); <br>
				b([k,p])=b([p,k]);<br>
				
				% interchange q-th and k-th column<br>
				A(:,[q,k])=A(:,[k,q]);<br>
				x_ind([q,k])=x_ind([k,q]);<br>
				
				
				% Remember we need to eleminate x_k from E(k+1) to E(n)? Therfore j=k+1 to n.<br>    
					for j=k+1:n<br>
						% we need to calculate the multipliers.<br>
						m = A(j,k)/A(k,k);<br>
						% Performing E(j)=E(j)-m_(jk)*E(k)<br>
						A(j,:) = A(j,:) - m*A(k,:);<br>
						   b(j)= b(j)-m*b(k);<br>
					end<br>
				end<br>
				% back substitution<br>
				%%<br>
				% <br>
				% $$x_n=\frac{b_n}{A_{nn}}$$<br>
				% <br>
				x(x_ind(n)) = b(n)/A(n,n);<br>
				
				%%<br>
				% <br>
				% $$x_i=\frac{b_i-\sum_{j=i+1}^{n}A_{i,j}x_j}{A_{ii}}$$<br>
				% <br>
				for i=n-1:-1:1<br>
						x(x_ind(i),:) = (b(i) - A(i,i+1:n)*x(x_ind(i+1:n)))/A(i,i);<br>
				end<br>
				
				disp(x)<br>
	GE partial pivot</center>
				%% Solving system of equation using Gaussian elemination method.<br>
				clear<br>
				% Define the matrix A and the vector b. <br>
				A = [1, 2, -1; 2, 1, -2; -3, 1, 1];<br>
				b= [3; 3; -6];     <br>
				
				% Find out the order of the matrix A<br>
				n= length(A); <br>
				
				% Initialize x<br>
				x = zeros(n,1); <br>
				
				% Forward elemination:<br>
				% Remember we need n-1 step for the elemination?? Therefore, k=1 to n-1.<br>
				for k=1:n-1<br>
				
				% Pivoting<br>
				[~,I]=max(abs(A(k:n,k))); % I is the index of maximum value<br>
				i=min(I)+k-1; % I may have multiple values, we need the lowest.<br>
				% interchange E(i) and E(k)<br>
				A([k,i],:)=A([i,k],:);<br>
				b([k,i])=b([i,k]);<br>
				
				% Remember we need to eleminate x_k from E(k+1) to E(n)? Therfore j=k+1 to n.<br>    
					for j=k+1:n<br>
						% we need to calculate the multipliers.<br>
						m = A(j,k)/A(k,k);<br>
						% Performing E(j)=E(j)-m_(jk)*E(k)<br>
						A(j,:) = A(j,:) - m*A(k,:);<br>
						   b(j)= b(j)-m*b(k);<br>
					end<br>
				end<br>
				% back substitution<br>
				%%<br>
				% <br>
				% $$x_n=\frac{b_n}{A_{nn}}$$<br>
				% <br>
				x(n) = b(n)/A(n,n);<br>
				
				%%<br>
				% <br>
				% $$x_i=\frac{b_i-\sum_{j=i+1}^{n}A_{i,j}x_j}{A_{ii}}$$<br>
				% <br>
				for i=n-1:-1:1<br>
						x(i,:) = (b(i) - A(i,i+1:n)*x(i+1:n))/A(i,i);<br>
				end<br>
				
				disp(x)<br>
		tri-diagonalt</center>
				%% Solving tri-diagonal system.<br>
				%<br>
				%  [ b(1)  c(1)                                  ] [  x(1)  ]   [  d(1)  ]<br>
				%  [ a(2)  b(2)  c(2)                            ] [  x(2)  ]   [  d(2)  ]<br>
				%  [       a(3)  b(3)  c(3)                      ] [   .    ]   [   .    ]<br>
				%  [            ...   ...   ...                  ] [   .    ] = [   .    ]<br>
				%  [                    ...    ...    ...        ] [   .    ]   [   .    ]<br>
				%  [                        a(n-1) b(n-1) c(n-1) ] [ x(n-1) ]   [ d(n-1) ]<br>
				%  [                                 a(n)  b(n)  ] [  x(n)  ]   [  d(n)  ]<br>
				%<br>
				%  a, b, c are vectors of length n, however, a(1) and c(n) are not in use)<br>
				
				
				%% the following portion should be known<br>
				% Define the vectors a, b, c and d. <br>
				n=3;<br>
				a=zeros(n,1);<br>
				b=zeros(n,1);<br>
				c=zeros(n,1);<br>
				d=zeros(n,1);<br>
				b(1)=4;c(1)=-1;d(1)=-20;<br>
				a(2:n-1)=1;b(2:n-1)=-4;c(2:n-1)=1; d(2:n-1)=40;<br>
				a(n)=-1;b(n)=4;d(n)=-20;<br>
				%% method starts here<br>
				% Initialize x<br>
				x = zeros(n,1); <br>
				% Forward elemination:<br>
				c(1)=c(1)/b(1);d(1)=d(1)/b(1);<br>
				for i=2:n-1<br>
				c(i)=c(i)/(b(i)-a(i)*c(i-1));<br>
				end<br>
				for i=2:n<br>
				d(i)=(d(i)-a(i)*d(i-1))/(b(i)-a(i)*c(i-1));<br>
				end<br>
				% Back substitution<br>
				x(n) = d(n);<br>
				for i=n-1:-1:1<br>
						x(i) = d(i) - c(i)*x(i+1);<br>
				end<br>
				

				

	Cholesky's LU</center>
				A=[1,2,3;2,8,22;3,22,82]<br>
				n=length(A);<br>

				L=zeros(n);<br>
				for k=1:n<br>
					L(k,k)=sqrt(A(k,k)-sum(L(k,1:k-1).^2));<br>
					for j=k+1:n<br>

						L(j,k)=(A(j,k)-L(j,1:k-1)*L(k,1:k-1)')/L(k,k);<br>
					
					end<br>
				end<br>
				L<br>
Crouts LU</center>
				A=[1,1,1;4,3,-1;3,5,3]<br>
				n=length(A);<br>

				L=zeros(n);<br>
				
				U=zeros(n);<br>
				for k=1:n<br>
					for k=1:n<br>
						for i=k:n<br>

							L(i,k)=A(i,k)-L(i,1:k-1)*U(1:k-1,k);<br>
				
						end<br>
					for i=k+1:n<br>

						U(k,i)=(A(k,i)-L(k,1:k-1)*U(1:k-1,i))/L(k,k);<br>
				
					end<br>
				end<br>
				L<br>
				U<br>

	DOOlitles LU</center>
				A=[1,1,1;4,3,-1;3,5,3]<br>
				n=length(A);<br>

				L=zeros(n);<br>
				
				U=zeros(n);<br>
				for k=1:n<br>
					L(k,k)=1;<br>
					for j=k:n<br>

						U(k,j)=A(k,j)-L(k,1:k-1)*U(1:k-1,j);<br>
				
					end<br>
					for i=k+1:n<br>

						L(i,k)=(A(i,k)-L(i,1:k-1)*U(1:k-1,k))/U(k,k);<br>
				
					end<br>
				end<br>
				L<br>
				U<br>
			
	gauss saidel</center>
				clc<br>
				clear<br>
				close all<br>
				A=[5 -2 3 0 6; -3 9 1 -2 7.4; 2 -1 -7 1 6.7; 4 3 -5 7 9; 2 3.5 6.1 -4 -8.1];<br>
				b=[-1 2 3 0.5 3.1]';<br>
				x=linspace(0,0,length(A))';<br>
				n=size(x,1);<br>
				normVal=Inf;<br>
				nmax=1000; %number of maximum iterations which can be reached%<br>
				tol=1e-3; % Tolerence for method%<br>
				iter=0;<br>
				while normVal>tol && iter<nmax %iteration starts%<br>
					x_old=x;<br>
						
					for i=1:n<br>
						
						guess=0;<br>
						
						for j=1:i-1<br>
							guess=guess+A(i,j)*x(j);<br>
						end<br>
						
						for j=i+1:n<br>
							guess=guess+A(i,j)*x_old(j);<br>
						end<br>
						
						x(i)=(1/A(i,i))*(b(i)-guess);<br>
						
					end<br>
					iter=iter+1;<br>
					normVal=norm(x_old-x);<br>
					
				end<br>
				fprintf('Solution of the system is : \n%f\n%f\n%f\n%f\n%f in %d iterations',x,iter);<br>
gauss Jacobian</center>
				clc<br>
				clear<br>
				A=input('Enter the coefficient matrix A: \n');<br>
				%A= [8 -3 2; 4 11 -1; 6 3 12] <br>
				% Write the coefficient matrix, A. where  the system: AX=B.<br>
				B=input('Enter the constant matrix B: \n');<br>
				%B = [20; 33; 35] % Write the constants matrix, B<br>
				P=[A B]; % constructing the new augmented matrix P <br>
				[row, col] = size(P); % Calculating the size of augmented matrix, P<br>
				X=zeros(row,1); % Initial approximation of solutions.<br>
				C=zeros(row,1); % A dummy column matrix.<br>
				Err=ones(row,1); % Error column matrix.<br>
				epsilon=input('\n Enter the tolerance of error '); <br>
				  %error of tolerance you want. for exmple 0.001 or 0.0001 etc.<br>
				for m = 1:row % checking strictly diagonally dominant matrix<br>
					  if 2*abs(A(m,m))<= sum(abs(A(m,:))) <br>
						 disp('Rearrange the equations to make strictly diagonally dominant matrix!!!');<br> 
						 %Gauus Jacobi method can't be applied.<br>
						 return<br>
					  end<br>
				end<br>
				  merr=max(Err);<br>
				while merr>epsilon % Finding the final result.<br>
					for m=1:1:row       <br>
					   C(m,1)=(1/P(m,m))*(P(m,col)-sum(A(m,:)*X(:,1))+A(m,m)*X(m,1));<br>
					   Err(m,1)= abs(C(m,1)-X(m,1));<br>
					end <br>
					X(:,1)=C(:,1);<br>
					merr=max(Err);<br>
				end<br>
				disp(' The required solution is:');<br>
				disp(X);<br>
				%fprintf('%1.5f \n', X(:,1));<br>
