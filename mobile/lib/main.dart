import 'package:flutter/material.dart';

void main() {
  runApp(const VaihaApp());
}

class VaihaApp extends StatelessWidget {
  const VaihaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Vaiha',
      home: const Scaffold(
        body: Center(
          child: Text('Vaiha Mobile (scaffold)'),
        ),
      ),
    );
  }
}
