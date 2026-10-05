from manim import *

class Main(Scene):
    def construct(self):
        # 1. Title positioned near top
        title = Text("NIQAT", font_size=48, color=BLUE)
        title.to_edge(UP, buff=1.5)

        # 2. Subtitle split into wrapped lines
        subtitle = Paragraph(
            "A platform that protects",
            "Ethiopia's payment system",
            "by checking for fraud, analyzing patterns & ", "warning users",
            alignment="center",
            font_size=22,
            color=WHITE
        )
        subtitle.next_to(title, DOWN, buff=0.6)

        # 3. Animations
        self.play(Write(title), run_time=1)
        self.play(Write(subtitle, shift=UP * 0.2), run_time=1)
        self.wait(2)