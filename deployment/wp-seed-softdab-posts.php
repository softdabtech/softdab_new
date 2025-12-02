<?php
/*
Plugin Name: SoftDAB One-time Seeder (MU)
Description: Seeds categories and 20 SEO posts. Place in wp-content/mu-plugins to auto-run once on admin.
Version: 1.0.0
*/

if (!defined('ABSPATH')) { exit; }

add_action('admin_init', function () {
    if (get_option('softdab_seed_done')) { return; }

    $categories = [
        ['name' => 'Software Development', 'slug' => 'software-development'],
        ['name' => 'Staff Augmentation', 'slug' => 'staff-augmentation'],
        ['name' => 'DevOps & Cloud', 'slug' => 'devops-cloud'],
        ['name' => 'AI & Data', 'slug' => 'ai-data'],
        ['name' => 'Cybersecurity', 'slug' => 'cybersecurity'],
        ['name' => 'Performance Optimization', 'slug' => 'performance-optimization'],
        ['name' => 'UI/UX Design', 'slug' => 'ui-ux'],
        ['name' => 'Web & Mobile', 'slug' => 'web-mobile'],
        ['name' => 'QA & Automation', 'slug' => 'qa-automation'],
        ['name' => 'SaaS & Product', 'slug' => 'saas-product'],
    ];

    foreach ($categories as $c) {
        if (!term_exists($c['slug'], 'category')) {
            wp_insert_term($c['name'], 'category', ['slug' => $c['slug']]);
        }
    }

    $base_links = '<ul>'
        .'<li><a href="https://www.softdab.tech/#services">custom software development services</a></li>'
        .'<li><a href="https://www.softdab.tech/#cases">case studies and results</a></li>'
        .'<li><a href="https://www.softdab.tech/#contact">contact SoftDAB</a> to get a free consultation</li>'
        .'<li><a href="https://www.softdab.tech/">Software Development Studio SoftDAB</a></li>'
        .'</ul>';

    $posts = [
        ['t' => 'AI-Powered Software Development: from PoC to Production', 'c' => 'ai-data', 'tags' => ['AI','Machine Learning','MLOps','Python'], 'b' => 'Discover how we turn ML ideas into production systems with robust MLOps, data pipelines, and model observability.'],
        ['t' => 'Staff Augmentation vs. Delivery Teams: choosing the right model', 'c' => 'staff-augmentation', 'tags' => ['Team Augmentation','Outsourcing','Nearshore'], 'b' => 'Compare augmentation with managed delivery to speed up backlogs while keeping quality and costs under control.'],
        ['t' => 'Modern DevOps & Cloud foundations on AWS/GCP/Azure', 'c' => 'devops-cloud', 'tags' => ['DevOps','Cloud','Kubernetes','Terraform','CI/CD'], 'b' => 'From landing zones to Kubernetes, we set up reproducible, secure and observable cloud infrastructure.'],
        ['t' => 'Performance Optimization: Core Web Vitals that move the needle', 'c' => 'performance-optimization', 'tags' => ['LCP','CLS','TTFB','Optimization','Frontend'], 'b' => 'We diagnose and fix performance bottlenecks end‑to‑end to improve SEO, conversion and UX.'],
        ['t' => 'Secure by Design: practical cybersecurity for products', 'c' => 'cybersecurity', 'tags' => ['AppSec','OWASP','Security','DevSecOps'], 'b' => 'Apply secure coding, SAST/DAST, secrets management, and hardening to protect apps and data.'],
        ['t' => 'Data Engineering for fast, reliable analytics', 'c' => 'ai-data', 'tags' => ['Data Engineering','ETL','Airflow','dbt','Warehouses'], 'b' => 'We build robust pipelines and semantic layers that empower analytics and AI use‑cases.'],
        ['t' => 'Design Systems & UI/UX that scale', 'c' => 'ui-ux', 'tags' => ['Design System','UX','Accessibility','Figma'], 'b' => 'Create accessible, consistent UI with component libraries, tokens and design QA.'],
        ['t' => 'Web Platforms that scale: React/Vite/Next', 'c' => 'web-mobile', 'tags' => ['React','Next.js','Vite','TypeScript'], 'b' => 'Modern web stacks with excellent DX, performance budgets, and test coverage.'],
        ['t' => 'Mobile Apps with shared code: RN/Flutter', 'c' => 'web-mobile', 'tags' => ['React Native','Flutter','Mobile','CI/CD'], 'b' => 'Ship cross‑platform apps with native feel and automated delivery pipelines.'],
        ['t' => 'QA Automation that prevents regressions', 'c' => 'qa-automation', 'tags' => ['Testing','Playwright','pytest','Automation'], 'b' => 'Risk‑based testing with E2E, API and contract tests to maintain release velocity.'],
        ['t' => 'SaaS Architecture: multi‑tenant, secure, observable', 'c' => 'saas-product', 'tags' => ['SaaS','Architecture','Multitenancy','Observability'], 'b' => 'Patterns for tenancy, isolation, billing, and ops to scale product safely.'],
        ['t' => 'Cost Optimization in Cloud without trade‑offs', 'c' => 'devops-cloud', 'tags' => ['FinOps','Cost','Cloud','AWS','GCP','Azure'], 'b' => 'Tagging, rightsizing, autoscaling and storage tiers to cut spend predictably.'],
        ['t' => 'From MVP to Scale: product delivery roadmap', 'c' => 'saas-product', 'tags' => ['MVP','Roadmap','Agile','Delivery'], 'b' => 'We help validate value quickly and evolve the system without rewrites.'],
        ['t' => 'APIs that last: REST, GraphQL, gRPC', 'c' => 'software-development', 'tags' => ['APIs','GraphQL','gRPC','REST'], 'b' => 'Design-first APIs with versioning, governance and robust contracts.'],
        ['t' => 'Database choices that fit the workload', 'c' => 'software-development', 'tags' => ['Postgres','NoSQL','Redis','Architecture'], 'b' => 'Right-size storage with performance, consistency and cost in mind.'],
        ['t' => 'Observability done right: logs, metrics, traces', 'c' => 'devops-cloud', 'tags' => ['Observability','Prometheus','OpenTelemetry'], 'b' => 'Capture the signals you need for fast MTTR and proactive reliability.'],
        ['t' => 'Security testing in CI/CD pipelines', 'c' => 'cybersecurity', 'tags' => ['DevSecOps','SAST','DAST','Secrets'], 'b' => 'Shift‑left security with automated scans and policies in pipelines.'],
        ['t' => 'Frontend architecture for speed and maintainability', 'c' => 'software-development', 'tags' => ['Frontend','Architecture','Monorepo'], 'b' => 'Modular architectures with code‑splitting, SSR/SSG and consistent tooling.'],
        ['t' => 'Data Privacy and Compliance by design', 'c' => 'cybersecurity', 'tags' => ['GDPR','Compliance','PII','Security'], 'b' => 'Bake in privacy, auditability and governance from day one.'],
        ['t' => 'Team Augmentation playbook: how we integrate fast', 'c' => 'staff-augmentation', 'tags' => ['Augmentation','Process','Onboarding'], 'b' => 'Our onboarding, rituals and tooling to blend with your teams quickly.'],
    ];

    foreach ($posts as $p) {
        $title = $p['t'];
        if (get_page_by_title($title, OBJECT, 'post')) { continue; }

        $term = get_term_by('slug', $p['c'], 'category');
        $cat_id = $term ? intval($term->term_id) : (get_term_by('slug','software-development','category')->term_id ?? 1);

        $body = esc_html($p['b']);
        $content = '<p>'.$body.'</p>'
            .'<h2>Why it matters</h2>'
            .'<p>SoftDAB helps companies architect, build, and scale secure, high‑performance products. We combine staff augmentation with end‑to‑end delivery to accelerate roadmaps.</p>'
            .'<h2>What you get</h2>'
            .'<ul>'
            .'<li>Battle‑tested delivery: cloud‑ready, secure‑by‑design, CI/CD‑driven</li>'
            .'<li>Measurable outcomes: performance, maintainability, cost efficiency</li>'
            .'<li>Flexible engagement: discovery, MVP, dedicated teams</li>'
            .'</ul>'
            .'<h2>Learn more</h2>'
            .$base_links;

        $postarr = [
            'post_type' => 'post',
            'post_status' => 'publish',
            'post_title' => $title,
            'post_content' => $content,
            'post_category' => [$cat_id],
            'tags_input' => $p['tags'],
        ];
        wp_insert_post($postarr);
    }

    update_option('softdab_seed_done', time());
});

add_action('admin_notices', function () {
    if (!get_option('softdab_seed_done')) { return; }
    echo '<div class="notice notice-success is-dismissible"><p>SoftDAB seeding completed.</p></div>';
});

add_filter('robots_txt', function ($output, $public) {
    $line = 'Sitemap: https://blog.softdab.tech/sitemap_index.xml';
    if (strpos($output, 'Sitemap:') === false) {
        $output .= (trim($output) ? "\n" : '') . $line . "\n";
    }
    return $output;
}, 10, 2);
