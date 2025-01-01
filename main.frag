// Author: Joao Vitor Rodrigues; github.com/vitormontana
// Title: 'Dance of The Spheres'
// .frag file for 'Patricio Gonzalezvivo GLSL editor'

#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

vec2 axis = vec2(0.1, 0.9); // Axis X and Y where particles move

// Sphere settings
const float sphere_number = 50.0;
vec3 sphere_color = vec3(0.1, 0.9, 0.4);
float glow = 0.01; // The glow of each sphere sums to general glow 
float glowsum = -0.1; // How much each sphere glow adds to general glow
float dist = 0.9;
float radius = 0.05;


float limit_x = 0.99; // Length limit, how long spheres can go
float limit_y = 0.99; // Height limit, how far spheres can go com y axis

void main(void) {
	
	float col = -0.3;
	vec2 centr = 2.0 * (gl_FragCoord.xy * 2.0 - u_resolution) /
		min(u_resolution.x, u_resolution.y);
	
	for(float i = 0.0; i < sphere_number; i++)
	{
	  float sine = sin(u_time + i * dist * axis.x ) * limit_x;
	  float cosine = cos(u_time + i * dist * axis.y ) * limit_y;
		
	  glowsum += glow / abs(length(centr + vec2(sine , cosine )) - radius);
	}

	gl_FragColor = vec4(vec3(sphere_color * glowsum), 1.0);
}
